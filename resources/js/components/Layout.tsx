import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import AuthStatus from "./Auth/AuthStatus";
import Navigation from "./Navigation";

export type LayoutProps = {}

const Layout = ({}: LayoutProps): JSX.Element => {
    return (
        <div>
            <AuthStatus />

            <Navigation/>

            <Outlet />
        </div>
    );
};

export default Layout;
