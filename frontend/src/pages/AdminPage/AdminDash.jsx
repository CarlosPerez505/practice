import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { closeSidebar } from '../../redux/slices/sideBarSlice'; // Adjusted import path

const AdminDash = () => {
    const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
    const dispatch = useDispatch();

    const handleLinkClick = () => {
        if (window.innerWidth <= 768) { // Only close sidebar on small screens
            dispatch(closeSidebar());
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className={`fixed z-30 inset-y-0 left-0 w-64 transition-transform transform bg-gray-800 text-white ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <div className="p-4 text-center text-lg font-bold">
                    Admin Dashboard
                </div>
                <nav>
                    <ul>
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
                <main className="flex-1 p-4 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDash;
