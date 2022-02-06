import React from 'react';
import useFeedTree from "../../hooks/useFeedTree";
import FeedTree from "../../utils/FeedTree";
import LayoutTreeFolder from "./LayoutTreeFolder";
import useParamsFolderId from "../../hooks/useParamsFolderId";

const FeedLayoutTree: React.FC = () => {
    const {data: tree, error} = useFeedTree();
    const activeFolderId = useParamsFolderId();

    if (tree) {
        const rootFolder = FeedTree.getRootFolder();

        return (
            <ul className="ant-menu ant-menu-root ant-menu-inline ant-menu-light">
                <LayoutTreeFolder
                    tree={tree}
                    folder={rootFolder}
                    activeFolderId={activeFolderId}
                />
            </ul>
        );
    }

    if (error) {
        return <span>Error: {error.message}</span>
    }

    return <span>Loading...</span>
};

export default FeedLayoutTree;
