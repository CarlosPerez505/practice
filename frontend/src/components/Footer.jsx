// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold">The Red PaLm Project</h2>
                        <p className="text-gray-400">Helping to find missing persons.</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="https://facebook.com" className="text-gray-400 hover:text-white transition duration-300">Facebook</a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-white transition duration-300">Twitter</a>
                        <a href="https://instagram.com" className="text-gray-400 hover:text-white transition duration-300">Instagram</a>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-500">
                    &copy; {new Date().getFullYear()} Missing Persons App. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
