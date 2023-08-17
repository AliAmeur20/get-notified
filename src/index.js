import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { ChannelContextProvider } from './context/ChannelContext';
import { AuthContextProvider } from './context/AuthContext';
import { AccountContextProvider } from './context/AccountContext';
import { FeedbackContextProvider } from './context/FeedbackContext';
import { ReportContextProvider } from './context/ReportsContext';
import { FRContextProvider } from './context/followers&reviewsContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthContextProvider>
    <AccountContextProvider>
    <ChannelContextProvider>
    <FeedbackContextProvider>
    <ReportContextProvider>
    <FRContextProvider>
    <App />
    </FRContextProvider>
    </ReportContextProvider>
    </FeedbackContextProvider>
    </ChannelContextProvider>
    </AccountContextProvider>
    </AuthContextProvider>
  // </React.StrictMode>
);


