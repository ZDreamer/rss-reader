import React from 'react';
import {TreeSelect} from "antd";
import {IFeedTree} from "../../api/ApiFolder";
import {IFolder} from "../../api/ApiFolder";
import FeedTree from "../../utils/FeedTree";

const { TreeNode } = TreeSelect;

export type FolderTreeSelectType = React.FC<{
    tree: IFeedTree,
    value?: number,
    onChange?(value: number): void
}>

const FolderTreeSelect: FolderTreeSelectType = ({
    tree,
    onChange,
    value
}) => {
    const onChangeHandler = (value: number) => {
        onChange && onChange(value);
    };

    const getTreeNodeTree = function (tree: IFeedTree, folder: IFolder) {
        return (
            <TreeNode key={folder.id} value={folder.id} title={folder.title}>
                {FeedTree.getFolderSubFolders(folder).map(
                    item => getTreeNodeTree(tree, item)
                )}
            </TreeNode>
        );
    }

    return (
        <TreeSelect
            showSearch
            style={{ width: '100%' }}
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Parent folder"
            allowClear={false}
            treeDefaultExpandAll
            onChange={onChangeHandler}
        >
            {getTreeNodeTree(
                tree,
                FeedTree.getRootFolder()
            )}
        </TreeSelect>
    );
};

export default FolderTreeSelect;