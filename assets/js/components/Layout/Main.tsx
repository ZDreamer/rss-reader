import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import FeedLayoutTree from "../Feed/LayoutTree";
import {Layout} from "antd";
import LayoutHeaderLeftTop from "./HeaderLeftTop";
import LayoutHeaderLeftBottom from "./HeaderLeftBottom";
import LayoutHeaderMainTop from "./HeaderMainTop";
import LayoutHeaderMainBottom from "./HeaderMainBottom";

const { Header, Content, Footer, Sider } = Layout;

const LayoutMain: FC = () => {
    return (
        <Layout>
            <Header>
                <div className="section left">
                    <LayoutHeaderLeftTop />

                    <LayoutHeaderLeftBottom />
                </div>

                <div className="section">
                    <LayoutHeaderMainTop />

                    <LayoutHeaderMainBottom />
                </div>
            </Header>

            <Layout style={{ marginTop: 64, marginLeft: 250 }}>
                <Sider
                    width="250"
                    style={{ overflow: 'auto', position: 'fixed', left: 0, top: 64, bottom: 0 }}
                >
                    <FeedLayoutTree/>

                    {/*<FeedLayoutTreeOld/>*/}
                </Sider>

                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutMain;
