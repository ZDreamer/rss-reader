import {useParams} from "react-router-dom";
import FeedTree from "../utils/FeedTree";

function useParamsFeedId() {
    const pageParams = useParams();

    if (FeedTree.tree && pageParams.feedId) {
        return parseInt(pageParams.feedId);
    } else {
        return 0;
    }
}

export default  useParamsFeedId;
