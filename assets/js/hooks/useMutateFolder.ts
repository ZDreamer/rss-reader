import {useMutation, useQueryClient} from "react-query";
import ApiFolder, {IFolder, IFolderNew, IFolderPatch} from "../api/ApiFolder";
import {ISubscriptionTree} from "../api/ApiFolder";
import SubscriptionTree from "../utils/SubscriptionTree";

type IMutateFolderProps = {
    onSuccess?: () => void
}

type IMutateFolderMutateProps = {
    folder: IFolderNew | IFolderPatch
}

function useMutateFolder(o: IMutateFolderProps) {
    const queryClient = useQueryClient()

    return useMutation(({ folder }: IMutateFolderMutateProps) => {
        console.log('folder');
        console.log(folder);

        if ('id' in folder) {
            return ApiFolder.modify(folder);
        } else {
            return ApiFolder.create(folder);
        }
    }, {
        onMutate: async ({ folder }: IMutateFolderMutateProps) => {
            if ('id' in folder) {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries(['subscriptionTree']);

                const previousTree = queryClient.getQueryData<ISubscriptionTree>(['subscriptionTree']);

                if (previousTree) {
                    queryClient.setQueryData<ISubscriptionTree>(
                        ['subscriptionTree'],
                        SubscriptionTree.getTreeWithUpdatedFolder(previousTree, folder)
                    );
                }

                return { invalidate: false, previousTree }
            } else {
                return { invalidate: true }
            }
        },

        onSuccess: (data, variables, context) => {
            if (context.invalidate) {
                queryClient.invalidateQueries(['subscriptionTree']);
            }

            o && o.onSuccess && o.onSuccess();
        },

        onError: (err, newTodo, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousTree) {
                queryClient.setQueryData<ISubscriptionTree>(
                    ['subscriptionTree'],
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