import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    const location = useLocation();
    console.log("Current Path:", location.pathname); // Debugging: Log the current path

    // Don't render the Navbar on the landing page
    //if (location.pathname === '/') {
    //    return null;
    //}

    // Render a simple back button for login and signup pages
    if (['/login', '/signup'].includes(location.pathname.toLowerCase())) {
        return (
            <nav style={{ padding: '10px', background: '#f0f0f0' }}>
                <Link to="/">Back</Link> {/* Adjust the link as needed */}
            </nav>
        );
    }


    if (['/'].includes(location.pathname.toLowerCase())) {
        return (
            <nav style={{ padding: '10px', background: '#f0f0f0' }}>
                <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
                <Link to="/admin/create">Admin</Link> {/* Adjust the link as needed */}
            </nav>
        );
    }






    // Default Navbar content for other pages
    return (
        <nav className="navbar">
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/admin/create">Admin</Link>

            {/* Add other links as needed */}
        </nav>
    );
}

export default Navbar;
