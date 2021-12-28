import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import MyLayout from "./MyLayout";
import AuthProvider from "./Auth/AuthProvider";
import AuthRequired from "./Auth/AuthRequired";
import ProtectedPage from "../pages/ProtectedPage";
import LoginPage from "../pages/LoginPage";

//https://reactrouter.com/docs/en/v6/examples/auth
//https://ant.design/components/overview/
/*
    all folder
    Can add subscriptions
    Can add folders
    Can put subscription in several folders
    can name/rename subscriptions/folders

    fixed order of folders
    no fixed order for subscriptions, auto sort, with new on top
 */
const App: FC = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<MyLayout/>}>
                    <Route path="/" element={<h1>Главная страница</h1>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/about" element={<About/>} />
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
