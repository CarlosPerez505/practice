import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import { SidebarProvider } from './context/SidebarContext';
import { ProfileProvider } from './context/ProfileContext';
import './index.css';
import EnvLogger from './components/EnvLogger';

console.log('App started');

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <ProfileProvider>
        <SidebarProvider>
            <Router>
                <App />
            </Router>
            <EnvLogger />
        </SidebarProvider>
    </ProfileProvider>
);
