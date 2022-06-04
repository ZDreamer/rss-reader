import {useMutation, useQueryClient} from "react-query";
import ApiFolder, {IFolder, IFolderNew, IFolderPatch} from "../api/ApiFolder";
import {IFeedTree} from "../api/ApiFolder";
import FeedTree from "../utils/FeedTree";

type IMutateFolderProps = {
    onSuccess?: () => void
}

type IMutateFolderMutateProps = {
    action: 'create',
    folder: IFolderNew
} | {
    action: 'update',
    folder: IFolderPatch
} | {
    action: 'remove',
    id: number
}

function useMutateFolder(o?: IMutateFolderProps) {
    const queryClient = useQueryClient()

    return useMutation((data: IMutateFolderMutateProps) => {
        if (data.action == 'create') {
            return ApiFolder.create(data.folder);
        } else if (data.action == 'update') {
            return ApiFolder.modify(data.folder);
        } else { //remove
            return ApiFolder.remove(data.id);
        }
    }, {
        onMutate: async (data: IMutateFolderMutateProps) => {
            if (data.action == 'update') {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries(['feedTree']);

                const previousTree = queryClient.getQueryData<IFeedTree>(['feedTree']);

                if (previousTree) {
                    queryClient.setQueryData<IFeedTree>(
                        ['feedTree'],
                        FeedTree.getTreeWithUpdatedFolder(previousTree, data.folder)
                    );
                }

                return { invalidate: false, previousTree }
            } else {
                return { invalidate: true }
            }
        },

        onSuccess: (data, variables, context) => {
            if (context.invalidate) {
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
            queryClient.invalidateQueries(['feedTree'])
        },
    });
}

export default useMutateFolder;