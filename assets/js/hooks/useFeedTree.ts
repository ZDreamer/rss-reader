import {useQuery} from "react-query";
import ApiFolder, {IFeedTree} from "../api/ApiFolder";
import {AxiosError} from "axios";
import FeedTree from "../utils/FeedTree";
import {useNavigate, useParams} from "react-router-dom";

function useFeedTree() {
    const pageParams = useParams();
    const navigate = useNavigate();

    return useQuery<IFeedTree, AxiosError>(
        ['feedTree'],
        ApiFolder.getTree,
        {
            staleTime: Infinity,
            cacheTime: Infinity,
            onSuccess: (tree) => {
                if (!tree.isProcessedAfterLoad) {
                    FeedTree.setTree(tree);
                    tree.isProcessedAfterLoad = true;

                    //TODO: Подумать как перенести это всё в обработчик onSuccess useMutateFeed
                    if (pageParams.feedId && !FeedTree.getFeed(pageParams.feedId)) {
                        navigate('/');
                        return;
                    }

                    if (pageParams.folderId && !FeedTree.getFolder(pageParams.folderId)) {
                        navigate('/');
                        return;
                    }

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
}

export default useFeedTree;