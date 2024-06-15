// src/pages/context/SidebarContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        console.log('SidebarContext initialized');
    }, []);

    useEffect(() => {
        console.log('Sidebar state changed:', isSidebarOpen);
    }, [isSidebarOpen]);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};
