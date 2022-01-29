import React from 'react';
import {NavLink} from "react-router-dom";

export type NavigationProps = {}

const Navigation = ({}: NavigationProps): JSX.Element => {
    return (
        <div className="navigation">
            <div className="navigation__links">
                <NavLink to="/">Public</NavLink>
                <NavLink to="/protected">Protected</NavLink>
            </div>
        </div>
    );
};

export default Navigation;
