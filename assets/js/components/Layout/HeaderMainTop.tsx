import React from 'react';
import AuthStatus from "../Auth/AuthStatus";
import Navigation from "../Navigation";
import GlobalFetchingIndicator from "../GlobalFetchingIndicator";

const LayoutHeaderMainTop: React.FC = () => {
    return (
        <div className="subsection">
            <AuthStatus />

            <Navigation/>

            <GlobalFetchingIndicator/>
        </div>
    );
};

export default LayoutHeaderMainTop;