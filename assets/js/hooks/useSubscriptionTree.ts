import {useQuery} from "react-query";
import {ISubscriptionTree} from "../api/ApiFolder";
import {useContext} from "react";
import {AuthContext} from "../components/Auth/AuthProvider";
import {AxiosError} from "axios";
import SubscriptionTree from "../utils/SubscriptionTree";
import ApiFolder from "../api/ApiFolder";

function useSubscriptionTree() {
    const auth = useContext(AuthContext);

    return useQuery<ISubscriptionTree, AxiosError>(
        ['subscriptionTree'],
        ApiFolder.getTree,
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