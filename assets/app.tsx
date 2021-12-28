import React from 'react';
import ReactDOM from 'react-dom';
import App from "./js/components/App";
import {BrowserRouter} from "react-router-dom";
import './less/app.less';

// ========================================

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
