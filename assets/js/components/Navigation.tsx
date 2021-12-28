import React from 'react';
import {NavLink} from "react-router-dom";
import {Menu} from "antd";

export type NavigationProps = {}

const Navigation = ({}: NavigationProps): JSX.Element => {
    return (
        <div className="navigation">
            <div className="navigation__links">
                <NavLink to="/">Public Page</NavLink>
                <NavLink to="/posts">Posts</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/protected">Protected Page</NavLink>
            </div>
        </div>
    );
};

export default Navigation;
