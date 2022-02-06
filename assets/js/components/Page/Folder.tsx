import React from 'react';
import {useParams} from "react-router-dom";
import useFeedTree from "../../hooks/useFeedTree";
import FeedTree from "../../utils/FeedTree";
import useParamsFolderId from "../../hooks/useParamsFolderId";

const PageFolder: React.FC = () => {
    const {data: tree} = useFeedTree();
    const folderId = useParamsFolderId();

    if (!tree) {
        return <div>Loading</div>;
    }

    return (
        <div>
            Folder <b>{folderId}</b> page!
        </div>
    );
};

export default PageFolder;