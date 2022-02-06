import {useParams} from "react-router-dom";
import FeedTree from "../utils/FeedTree";

function useParamsFolderId() {
    const pageParams = useParams();

    if (!FeedTree.tree) {
        return 0;
    } else if (pageParams.folderId) {
        return parseInt(pageParams.folderId);
    } else {
        return FeedTree.getRootFolder().id;
    }
}

export default  useParamsFolderId;
