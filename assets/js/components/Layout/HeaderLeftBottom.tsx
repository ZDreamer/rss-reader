import React from 'react';
import FolderAddButton from "../Folder/AddButton";
import FeedAddButton from "../Feed/AddButton";
import {Space} from "antd";

const LayoutHeaderLeftBottom: React.FC = () => {
    return (
        <div className="subsection">
            <Space size={4}>
                <FolderAddButton/>

                <FeedAddButton/>
            </Space>
        </div>
    );
};

export default LayoutHeaderLeftBottom;