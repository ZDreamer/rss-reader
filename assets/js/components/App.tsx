import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import NotFound from "../pages/NotFound";
import MyLayout from "./MyLayout";
import AuthProvider from "./Auth/AuthProvider";
import AuthRequired from "./Auth/AuthRequired";
import ProtectedPage from "../pages/ProtectedPage";
import LoginPage from "../pages/LoginPage";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        },
    },
});

const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Routes>
                    <Route element={<MyLayout/>}>
                        <Route path="/" element={<h1>Главная страница</h1>} />
                        <Route path="/login" element={<LoginPage />} />
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
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
