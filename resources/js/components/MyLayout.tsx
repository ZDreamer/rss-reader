import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import AuthStatus from "./Auth/AuthStatus";
import Navigation from "./Navigation";
import SubscriptionAddButton from "./Subscription/AddButton";
import SubscriptionLayoutTree from "./Subscription/LayoutTree";
import {Layout, Menu} from "antd";

const { Header, Content, Footer, Sider } = Layout;

const MyLayout: FC = () => {
    return (
        <Layout>
            <Header>
                <AuthStatus />

                <SubscriptionAddButton/>

                <Navigation/>
            </Header>

            <Layout>
                <Content>
                    <Outlet />
                </Content>

                <Sider width="200">
                    <SubscriptionLayoutTree/>
                </Sider>
            </Layout>
        </Layout>
    );
};

export default MyLayout;