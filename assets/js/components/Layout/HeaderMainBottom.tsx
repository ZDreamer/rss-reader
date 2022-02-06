import React from 'react';
import {useParams} from "react-router-dom";
import FolderMenu from "../Folder/Menu";

const LayoutHeaderMainBottom: React.FC = () => {
    const params = useParams();

    return (
        <div className="subsection">
            <FolderMenu/>
        </div>
    );
};

export default LayoutHeaderMainBottom;