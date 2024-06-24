import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Transition } from '@headlessui/react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    // Hide navbar on admin routes
    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <nav className="bg-white text-gray-800 p-4 shadow-md fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600">Missing Persons App</div>
                <div className="hidden md:flex space-x-8">
                    <RouterLink to="/" className="cursor-pointer hover:text-blue-600 transition duration-300">
                        Home
                    </RouterLink>
                    <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer hover:text-blue-600 transition duration-300">
                        About
                    </ScrollLink>
                    <ScrollLink to="map" smooth={true} duration={500} className="cursor-pointer hover:text-blue-600 transition duration-300">
                        Map
                    </ScrollLink>
                    <ScrollLink to="profiles" smooth={true} duration={500} className="cursor-pointer hover:text-blue-600 transition duration-300">
                        Profiles
                    </ScrollLink>
                    <ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-blue-600 transition duration-300">
                        Contact
                    </ScrollLink>
                    <RouterLink to="/openai" className="cursor-pointer hover:text-blue-600 transition duration-300">
                        OpenAI
                    </RouterLink>
                    <RouterLink to="/admin" className="cursor-pointer hover:text-blue-600 transition duration-300">
                        Admin
                    </RouterLink>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>
            <Transition
                show={isOpen}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {(ref) => (
                    <div ref={ref} className="md:hidden bg-white shadow-md">
                        <div className="flex flex-col space-y-4 mt-4 p-4">
                            <RouterLink to="/" className="cursor-pointer hover:text-blue-600 transition duration-300" onClick={closeMenu}>
                                Home
                            </RouterLink>
                            <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer hover:text-blue-600 transition duration-300" onClick={closeMenu}>
                                About
                            </ScrollLink>
                            <ScrollLink to="map" smooth={true} duration={500} className="cursor-pointer hover:text-blue-600 transition duration-300" onClick={closeMenu}>
                                Map
                            </ScrollLink>
                            <ScrollLink to="profiles" smooth={true} duration={500} className="cursor-pointer hover:text-blue-600 transition duration-300" onClick={closeMenu}>
                                Profiles
                            </ScrollLink>
                            <ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-blue-600 transition duration-300" onClick={closeMenu}>
                                Contact
                            </ScrollLink>
                            <RouterLink to="/openai" className="cursor-pointer hover:text-blue-600 transition duration-300" onClick={closeMenu}>
                                OpenAI
                            </RouterLink>
                            <RouterLink to="/admin" className="cursor-pointer hover:text-blue-600 transition duration-300" onClick={closeMenu}>
                                Admin
                            </RouterLink>
                        </div>
                    </div>
                )}
            </Transition>
        </nav>
    );
};

export default Navbar;