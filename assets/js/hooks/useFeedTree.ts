import {useQuery} from "react-query";
import {IFeedTree} from "../api/ApiFolder";
import {useContext} from "react";
import {AuthContext} from "../components/Auth/AuthProvider";
import {AxiosError} from "axios";
import FeedTree from "../utils/FeedTree";
import ApiFolder from "../api/ApiFolder";

function useFeedTree() {
    const auth = useContext(AuthContext);

    return useQuery<IFeedTree, AxiosError>(
        ['feedTree'],
        ApiFolder.getTree,
        {
            staleTime: Infinity,
            cacheTime: Infinity,
            onSuccess: tree => {
                FeedTree.setTree(tree);
            }
        }
    );
}

export default useFeedTree;