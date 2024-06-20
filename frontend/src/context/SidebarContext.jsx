import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <SidebarContext.Provider value={{ isOpen, openSidebar, closeSidebar, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
