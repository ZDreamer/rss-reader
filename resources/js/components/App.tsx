import React from 'react';
import {Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import NotFound from "../pages/NotFound";
import PostPage from "../pages/PostPage";
import Layout from "./Layout";
import AuthProvider from "./Auth/AuthProvider";
import AuthRequired from "./Auth/AuthRequired";
import ProtectedPage from "../pages/ProtectedPage";
import LoginPage from "../pages/LoginPage";

export type AppProps = {}

//https://reactrouter.com/docs/en/v6/examples/auth
const App = ({}: AppProps): JSX.Element => {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<h1>Главная страница</h1>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/posts" element={<Posts/>} />
                    <Route
                        path="posts/:id"
                        element={<PostPage />}
                    />
                    <Route
                        path="/protected"
                        element={
                            <AuthRequired>
                                <ProtectedPage />
                            </AuthRequired>
                        }
                    />
                    <Route path="*" element={<NotFound/>} />
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
