import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import NotFound from "../pages/NotFound";
import LayoutMain from "./Layout/Main";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import PageFolder from "../pages/Folder";
import PageFeed from "../pages/Feed";

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
            <Routes>
                <Route element={<LayoutMain/>}>
                    <Route path="/" element={<PageFolder/>} />

                    {/*TODO: Сделать красивые ссылки*/}
                    <Route path="folder/:folderId" element={<PageFolder/>} />

                    <Route path="folder/:folderId/feed/:feedId" element={<PageFeed/>} />

                    <Route path="*" element={<NotFound/>} />
                </Route>
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
