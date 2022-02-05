import React from 'react';
import useSubscriptionTree from "../../hooks/useSubscriptionTree";
import SubscriptionTree from "../../utils/SubscriptionTree";
import {ISubscriptionTree} from "../../api/ApiFolder";
import {IFolder} from "../../api/ApiFolder";
import {Menu} from "antd";

const SubscriptionLayoutTreeOld: React.FC = () => {
    const {data: tree, error} = useSubscriptionTree();

    const getTreeNodeTree = function (tree: ISubscriptionTree, folder: IFolder) {
        return (
            <Menu.SubMenu
                key={folder.id}
                title={folder.title}
            >
                {SubscriptionTree.getFolderSubFolders(folder).map(
                    item => getTreeNodeTree(tree, item)
                )}
            </Menu.SubMenu>
        );
    }

    if (tree) {
        const rootFolder = SubscriptionTree.getRootFolder();
        const openedFolderIds = SubscriptionTree.getOpenedFolders();

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

export default SubscriptionLayoutTreeOld;
