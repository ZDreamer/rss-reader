import React from 'react';
import useFeedTree from "../../hooks/useFeedTree";
import FeedTree from "../../utils/FeedTree";
import {IFeedTree} from "../../api/ApiFolder";
import {IFolder} from "../../api/ApiFolder";
import {Menu} from "antd";

const FeedLayoutTreeOld: React.FC = () => {
    const {data: tree, error} = useFeedTree();

    const getTreeNodeTree = function (tree: IFeedTree, folder: IFolder) {
        return (
            <Menu.SubMenu
                key={folder.id}
                title={folder.title}
            >
                {FeedTree.getFolderSubFolders(folder).map(
                    item => getTreeNodeTree(tree, item)
                )}
            </Menu.SubMenu>
        );
    }

    if (tree) {
        const rootFolder = FeedTree.getRootFolder();
        const openedFolderIds = FeedTree.getOpenedFolders();

        return (
            <Menu
                mode="inline"
                defaultOpenKeys={openedFolderIds.map(id => id.toString())}
            >
                {getTreeNodeTree(tree, rootFolder)}
            </Menu>
        );
    }

    if (error) {
        return <span>Error: {error.message}</span>
    }

    return <span>Loading...</span>
};

export default FeedLayoutTreeOld;
