import React from 'react';
import {Button} from "antd";

const LayoutHeaderLeftTop: React.FC = () => {
    return (
        <div className="subsection">
            Logo

            <Button
                onClick={() => location.href = '/logout'}
            >Sign out</Button>
        </div>
    );
};

export default LayoutHeaderLeftTop;