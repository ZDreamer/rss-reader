import React from 'react';
import {useParams} from "react-router-dom";
import FolderMenu from "../Folder/Menu";
import FeedMenu from "../Feed/Menu";

const LayoutHeaderMainBottom: React.FC = () => {
    const pageParams = useParams();

    return (

        <div className="subsection">
            {pageParams.folderId && (
                <FolderMenu folderId={parseInt(pageParams.folderId)} />
            )}

            {pageParams.feedId && (
                <FeedMenu feedId={parseInt(pageParams.feedId)} />
            )}
        </div>
    );
};

export default LayoutHeaderMainBottom;