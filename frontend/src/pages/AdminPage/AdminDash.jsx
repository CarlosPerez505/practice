import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLinkClick = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className={`fixed z-30 inset-y-0 left-0 w-64 transition transform bg-gray-800 text-white ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <div className="p-4 text-center text-lg font-bold">
                    Admin Dashboard
                </div>
                <nav>
                    <ul>
                        <li className="p-4 hover:bg-gray-700">
                            <Link to="create" onClick={handleLinkClick}>Create Case</Link>
                        </li>
                        <li className="p-4 hover:bg-gray-700">
                            <Link to="admin/update/:id" onClick={handleLinkClick}>Update Case</Link>
                        </li>
                        <li className="p-4 hover:bg-gray-700">
                            <Link to="settings" onClick={handleLinkClick}>Settings</Link>
                        </li>
                        <li className="p-4 hover:bg-gray-700">
                            <Link to="search" onClick={handleLinkClick}>Search Cases</Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-gray-800 text-white p-4 md:hidden">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
                    </button>
                </header>
                <main className="flex-1 p-4 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

