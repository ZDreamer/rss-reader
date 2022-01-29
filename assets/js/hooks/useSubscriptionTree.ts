import {useQuery} from "react-query";
import ApiUser, {ISubscriptionTree} from "../api/ApiUser";
import React from "react";
import {AuthContext} from "../components/Auth/AuthProvider";
import {AxiosError} from "axios";
import SubscriptionTree from "../utils/SubscriptionTree";

function useSubscriptionTree() {
    const auth = React.useContext(AuthContext);

    return useQuery<ISubscriptionTree, AxiosError>(
        ['user', auth.user.id, 'subscriptionTree'],
        ApiUser.getSubscriptionTree,
        {
            staleTime: Infinity,
            cacheTime: Infinity,
            onSuccess: tree => {
                SubscriptionTree.setTree(tree);
            }
        }
    );
}

export default  useSubscriptionTree;