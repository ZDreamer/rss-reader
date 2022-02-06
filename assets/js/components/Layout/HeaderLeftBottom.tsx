import React from 'react';
import FolderAddButton from "../Folder/AddButton";
import FeedAddButton from "../Feed/AddButton";

const LayoutHeaderLeftBottom: React.FC = () => {
    return (
        <div className="subsection">
            <FolderAddButton/>

            <FeedAddButton/>
        </div>
    );
};

export default LayoutHeaderLeftBottom;