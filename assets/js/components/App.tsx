import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import NotFound from "../pages/NotFound";
import LayoutMain from "./Layout/Main";
import AuthProvider from "./Auth/AuthProvider";
import AuthRequired from "./Auth/AuthRequired";
import ProtectedPage from "../pages/ProtectedPage";
import LoginPage from "../pages/LoginPage";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import PageFolder from "./Page/Folder";

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
                    <Route element={<LayoutMain/>}>
                        <Route path="/" element={<PageFolder/>} />

                        {/*TODO: Сделать красивые ссылки*/}
                        <Route path="folder/:folderId" element={<PageFolder/>} />

                        <Route path="login" element={<LoginPage />} />

                        <Route
                            path="protected"
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
