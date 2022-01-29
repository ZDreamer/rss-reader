import React from 'react';
import useSubscriptionTree from "../../hooks/useSubscriptionTree";
import SubscriptionTree from "../../utils/SubscriptionTree";
import LayoutTreeFolder from "./LayoutTreeFolder";

const SubscriptionLayoutTree: React.FC = () => {
    const {data: tree, error} = useSubscriptionTree();

    if (tree) {
        const rootFolder = SubscriptionTree.getRootFolder();

        return (
            <ul className="ant-menu ant-menu-root ant-menu-inline ant-menu-light">
                <LayoutTreeFolder
                    tree={tree}
                    folder={rootFolder}
                />
            </ul>
        );
    }

    if (error) {
        return <span>Error: {error.message}</span>
    }

    return <span>Loading...</span>
};

export default SubscriptionLayoutTree;
