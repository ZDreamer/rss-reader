import React from 'react';
import GlobalFetchingIndicator from "../GlobalFetchingIndicator";

const LayoutHeaderMainTop: React.FC = () => {
    return (
        <div className="subsection">
            <GlobalFetchingIndicator/>
        </div>
    );
};

export default LayoutHeaderMainTop;