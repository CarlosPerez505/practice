import React, {useState} from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';

const AdminDash = () => {
    const { isOpen, openSidebar, closeSidebar, toggleSidebar } = useSidebar();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const handleLinkClick = () => {
        if (window.innerWidth <= 768) { // Only close sidebar on small screens
            setIsMobileSidebarOpen(false);
            closeSidebar();
        }
    };

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <aside className={`fixed z-30 inset-y-0 left-0 w-64 transition-transform transform bg-gray-800 text-white ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 shadow-lg`}>
                <div className="p-4 text-center text-xl font-bold border-b border-gray-700">
                    Admin Dashboard
                </div>
                <nav className="mt-4">
                    <ul>
                        <li className="p-4 hover:bg-gray-700 cursor-pointer">
                            <Link to="/" onClick={handleLinkClick}>Home</Link>
                        </li>
                        <li className="p-4 hover:bg-gray-700 cursor-pointer">
                            <Link to="create" onClick={handleLinkClick}>Create Case</Link>
                        </li>
                        <li className="p-4 hover:bg-gray-700 cursor-pointer">
                            <Link to="update/:id" onClick={handleLinkClick}>Update Case</Link>
                        </li>
                        <li className="p-4 hover:bg-gray-700 cursor-pointer">
                            <Link to="search" onClick={handleLinkClick}>Search Cases</Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <div className="md:hidden p-4 bg-gray-800">
                    <button
                        className="text-white"
                        onClick={toggleMobileSidebar}
                    >
                        {isMobileSidebarOpen ? 'Close Menu' : 'Open Menu'}
                    </button>
                </div>
                <main className="flex-1 p-4 bg-white shadow-lg rounded-lg">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDash;
