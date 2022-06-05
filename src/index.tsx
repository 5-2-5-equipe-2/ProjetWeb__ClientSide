import React from 'react';
import ReactDOM from 'react-dom/client';
import './media/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClientProvider, QueryClient} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import LogRocket from 'logrocket';
LogRocket.init('cle0qm/react-test');
LogRocket.identify('THE_USER_ID_IN_YOUR_APP', {
    name: 'James Morrison',
    email: 'jamesmorrison@example.com',

});

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
