import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="bg-navbar-gradient text-white p-4 shadow-neumorphism">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">Missing Persons App</div>
                <div className="hidden md:flex space-x-6">
                    <RouterLink to="/" className="cursor-pointer hover:text-gray-400">
                        Home
                    </RouterLink>
                    <ScrollLink to="profiles" smooth={true} duration={500} className="cursor-pointer hover:text-gray-400">
                        Profiles
                    </ScrollLink>
                    <ScrollLink to="map" smooth={true} duration={500} className="cursor-pointer hover:text-gray-400">
                        Map
                    </ScrollLink>
                    <ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-gray-400">
                        Contact
                    </ScrollLink>
                    <RouterLink to="/admin" className="cursor-pointer hover:text-gray-400">
                        Admin
                    </RouterLink>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="flex flex-col space-y-4 mt-4">
                    <RouterLink to="/" className="cursor-pointer hover:text-gray-400" onClick={closeMenu}>
                        Home
                    </RouterLink>
                    <ScrollLink to="profiles" smooth={true} duration={500} className="cursor-pointer hover:text-gray-400" onClick={closeMenu}>
                        Profiles
                    </ScrollLink>
                    <ScrollLink to="map" smooth={true} duration={500} className="cursor-pointer hover:text-gray-400" onClick={closeMenu}>
                        Map
                    </ScrollLink>
                    <ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-gray-400" onClick={closeMenu}>
                        Contact
                    </ScrollLink>
                    <RouterLink to="/admin" className="cursor-pointer hover:text-gray-400" onClick={closeMenu}>
                        Admin
                    </RouterLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


