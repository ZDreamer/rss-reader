import React from 'react';
import useFeedTree from "../../hooks/useFeedTree";
import FeedTree from "../../utils/FeedTree";
import LayoutTreeFolder from "./LayoutTreeFolder";
import useParamsFolderId from "../../hooks/useParamsFolderId";
import useParamsFeedId from "../../hooks/useParamsFeedId";
import MutationErrors from "../MutationErrors";

const FeedLayoutTree: React.FC = () => {
    const {data: tree, error} = useFeedTree();
    const activeFolderId = useParamsFolderId();
    const activeFeedId = useParamsFeedId();

    if (tree) {
        const rootFolder = FeedTree.getRootFolder();

        return (
            <ul className="ant-menu ant-menu-root ant-menu-inline ant-menu-light">
                <LayoutTreeFolder
                    tree={tree}
                    folder={rootFolder}
                    activeFolderId={activeFolderId}
                    activeFeedId={activeFeedId}
                />
            </ul>
        );
    }

    if (error) {
        return <MutationErrors errorObject={error} />
    }

    return <span>Loading...</span>
};

export default FeedLayoutTree;
