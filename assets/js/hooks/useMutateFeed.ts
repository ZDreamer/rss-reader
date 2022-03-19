import {useMutation, useQueryClient} from "react-query";
import {IFeedTree} from "../api/ApiFolder";
import FeedTree from "../utils/FeedTree";
import ApiFeed, {IFeedNew, IFeedPatch} from "../api/ApiFeed";

type IMutateFeedProps = {
    onSuccess?: () => void
}

type IMutateFeedMutateProps = {
    action: 'create',
    feed: IFeedNew
} | {
    action: 'update',
    feed: IFeedPatch
} | {
    action: 'remove',
    id: number
}

function useMutateFeed(o?: IMutateFeedProps) {
    const queryClient = useQueryClient()

    return useMutation((data: IMutateFeedMutateProps) => {
        if (data.action == 'create') {
            return ApiFeed.create(data.feed);
        } else if (data.action == 'update') {
            return ApiFeed.modify(data.feed);
        } else { //remove
            return ApiFeed.remove(data.id);
        }
    }, {
        onMutate: async (data: IMutateFeedMutateProps) => {
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

                if (needFullReload) {
                    return { invalidate: true }
                } else {
                    const previousTree = queryClient.getQueryData<IFeedTree>(['feedTree']);

                    if (previousTree) {
                        queryClient.setQueryData<IFeedTree>(
                            ['feedTree'],
                            FeedTree.getTreeWithUpdatedFeed(previousTree, data.feed)
                        );
                    }

                    return { invalidate: false, previousTree }
                }
            } else {
                return { invalidate: true }
            }
        },

        onSuccess: (data, variables, context) => {
            if (context.invalidate) {
                //TODO: Если мы удаляем фид из папки, находясь в нём, надо кидать на главную
                queryClient.invalidateQueries(['feedTree']);
            }

            o && o.onSuccess && o.onSuccess();
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
            queryClient.invalidateQueries('todos')
        },
    });
}

export default useMutateFeed;