import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    console.log("Current Path:", location.pathname); // Debugging: Log the current path

    // Render a simple back button for login and signup pages
    if (['/login', '/signup'].includes(location.pathname.toLowerCase())) {
        return (
            <nav className="p-4 bg-gray-200">
                <Link to="/" className="text-gray-800">Back</Link>
            </nav>
        );
    }

    // Custom navbar for the landing page
    if (location.pathname.toLowerCase() === '/') {
        return (
            <nav className="p-4 bg-gray-200 flex justify-between">
                <Link to="/" className="mr-4 text-gray-800">Home</Link>
                <Link to="/admin" className="text-gray-800">Admin</Link>
            </nav>
        );
    }

    // Default Navbar content for other pages
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <Link to="/" className="mr-4">Home</Link>
            <Link to="/admin">Admin</Link>
            {/* Add other links as needed */}
        </nav>
    );
}

export default Navbar;
