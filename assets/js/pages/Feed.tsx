import React from 'react';
import useFeedTree from "../hooks/useFeedTree";
import useParamsFolderId from "../hooks/useParamsFolderId";
import useParamsFeedId from "../hooks/useParamsFeedId";

const PageFeed: React.FC = () => {
    const {data: tree} = useFeedTree();
    const folderId = useParamsFolderId();
    const feedId = useParamsFeedId();

    if (!tree) {
        return <div>Loading</div>;
    }

    return (
        <div>
            Feed <b>{feedId}</b> in folder <b>{folderId}</b> page!
        </div>
    );
};

export default PageFeed;