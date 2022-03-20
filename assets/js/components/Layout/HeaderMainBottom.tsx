import React from 'react';
import {useParams} from "react-router-dom";
import FolderMenu from "../Folder/Menu";
import FeedMenu from "../Feed/Menu";
import {Space} from "antd";

const LayoutHeaderMainBottom: React.FC = () => {
    const pageParams = useParams();

    return (
        <div className="subsection">
            <Space size={4}>
                {pageParams.folderId && (
                    <FolderMenu folderId={parseInt(pageParams.folderId)} />
                )}

                {pageParams.feedId && (
                    <FeedMenu feedId={parseInt(pageParams.feedId)} />
                )}
            </Space>
        </div>
    );
};

export default LayoutHeaderMainBottom;