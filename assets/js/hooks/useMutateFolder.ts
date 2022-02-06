import {useMutation, useQueryClient} from "react-query";
import ApiFolder, {IFolder, IFolderNew, IFolderPatch} from "../api/ApiFolder";
import {IFeedTree} from "../api/ApiFolder";
import FeedTree from "../utils/FeedTree";

type IMutateFolderProps = {
    onSuccess?: () => void
}

type IMutateFolderMutateProps = {
    folder: IFolderNew | IFolderPatch
}

function useMutateFolder(o?: IMutateFolderProps) {
    const queryClient = useQueryClient()

    return useMutation(({ folder }: IMutateFolderMutateProps) => {
        if ('id' in folder) {
            return ApiFolder.modify(folder);
        } else {
            return ApiFolder.create(folder);
        }
    }, {
        onMutate: async ({ folder }: IMutateFolderMutateProps) => {
            if ('id' in folder) {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries(['feedTree']);

                const previousTree = queryClient.getQueryData<IFeedTree>(['feedTree']);

                if (previousTree) {
                    queryClient.setQueryData<IFeedTree>(
                        ['feedTree'],
                        FeedTree.getTreeWithUpdatedFolder(previousTree, folder)
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
            queryClient.invalidateQueries('todos')
        },
    });
}

export default useMutateFolder;