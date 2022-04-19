import React from 'react';
import useFeedTree from "../hooks/useFeedTree";
import useParamsFolderId from "../hooks/useParamsFolderId";

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