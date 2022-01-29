import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import AuthStatus from "./Auth/AuthStatus";
import Navigation from "./Navigation";
import SubscriptionAddButton from "./Subscription/AddButton";
import SubscriptionLayoutTree from "./Subscription/LayoutTree";
import {Layout} from "antd";
import GlobalFetchingIndicator from "./GlobalFetchingIndicator";
import FolderAddButton from "./Folder/AddButton";
import SubscriptionLayoutTreeOld from "./Subscription/LayoutTreeOld";

const { Header, Content, Footer, Sider } = Layout;

const MyLayout: FC = () => {
    return (
        <Layout>
            <Header>
                <AuthStatus />

                <FolderAddButton/>

                <SubscriptionAddButton/>

                <Navigation/>

                <GlobalFetchingIndicator/>
            </Header>

            <Layout>
                <Sider width="300">
                    <SubscriptionLayoutTree/>

                    {/*<SubscriptionLayoutTreeOld/>*/}
                </Sider>

                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MyLayout;
