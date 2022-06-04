import {useMutation, useQueryClient} from "react-query";
import {IFeedTree} from "../api/ApiFolder";
import FeedTree from "../utils/FeedTree";
import ApiFeed, {IFeedNew, IFeedPatch} from "../api/ApiFeed";

type IMutateFeedProps = {
    onSuccess?: (data: IMutateFeedMutateProps) => void
}

type IMutateFeedMutateProps = {
    action: 'create',
    feed: IFeedNew
} | {
    action: 'update',
    feed: IFeedPatch
} | {
    action: 'reload',
    id: number
} | {
    action: 'remove',
    id: number
}

type IMutateFeedMutateContext = {
    invalidate: boolean,
    mutateData: IMutateFeedMutateProps,
    previousTree: IFeedTree | undefined
}

function useMutateFeed(o?: IMutateFeedProps) {
    const queryClient = useQueryClient()

    return useMutation((data: IMutateFeedMutateProps) => {
        if (data.action == 'create') {
            return ApiFeed.create(data.feed);
        } else if (data.action == 'update') {
            return ApiFeed.modify(data.feed);
        } else if (data.action == 'reload') {
            return ApiFeed.reload(data.id);
        } else { //remove
            return ApiFeed.remove(data.id);
        }
    }, {
        onMutate: async (data: IMutateFeedMutateProps) => {
            const context: IMutateFeedMutateContext = {
                invalidate: true,
                mutateData: data,
                previousTree: undefined
            };

            if (data.action == 'update') {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries(['feedTree']);

                const oldFeed = FeedTree.getFeed(data.feed.id);
                let needFullReload = false
                if (
                    data.feed.folders &&
                    JSON.stringify(data.feed.folders) !== JSON.stringify(oldFeed.folders)
                ) {
                    needFullReload = true;
                }

                if (!needFullReload) {
                    const previousTree = queryClient.getQueryData<IFeedTree>(['feedTree']);

                    if (previousTree) {
                        queryClient.setQueryData<IFeedTree>(
                            ['feedTree'],
                            FeedTree.getTreeWithUpdatedFeed(previousTree, data.feed)
                        );
                    }

                    context.invalidate = false;
                    context.previousTree = previousTree;
                }
            } else if (data.action == 'reload') {
                //context.invalidate = false;
            }

            return context;
        },

        onSuccess: (data, variables, context) => {
            if (context.invalidate) {
                queryClient.invalidateQueries(['feedTree']);
            }

            o && o.onSuccess && o.onSuccess(context.mutateData);
        },

        onError: (err, newTodo, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousTree) {
                queryClient.setQueryData<IFeedTree>(
                    ['feedTree'],
                    context.previousTree
                );
            }
        },

        onSettled: () => {
            // Always refetch after error or success:
            queryClient.invalidateQueries(['feedTree'])
        },
    });
}

export default useMutateFeed;