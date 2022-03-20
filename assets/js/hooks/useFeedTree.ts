import {useQuery} from "react-query";
import {IFeedTree} from "../api/ApiFolder";
import {useContext, useEffect, useRef} from "react";
import {AuthContext} from "../components/Auth/AuthProvider";
import {AxiosError} from "axios";
import FeedTree from "../utils/FeedTree";
import ApiFolder from "../api/ApiFolder";
import {useLocation, useNavigate, useParams} from "react-router-dom";

function useFeedTree() {
    const auth = useContext(AuthContext);
    const pageParams = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const query = useQuery<IFeedTree, AxiosError>(
        ['feedTree'],
        ApiFolder.getTree,
        {
            staleTime: Infinity,
            cacheTime: Infinity,
            onSuccess: (tree) => {
                if (!tree.isProcessedAfterLoad) {
                    FeedTree.setTree(tree);
                    tree.isProcessedAfterLoad = true;

                    if (pageParams.feedId && pageParams.folderId) {
                        const feed = FeedTree.getFeed(pageParams.feedId);

                        if (!feed.folders.includes(parseInt(pageParams.folderId))) {
                            navigate(`/folder/${feed.folders[0]}/feed/${pageParams.feedId}`);
                        }
                    }
                }
            }
        }
    );

    return query;
}

export default useFeedTree;