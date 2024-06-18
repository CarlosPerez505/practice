import React from 'react';
import abstractTravel from './../assets/abstract-travel.jpg';

const Hero = () => {
    return (
        <div
            id="hero"
            className="flex items-center justify-center h-screen w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white relative overflow-hidden"
            style={{ backgroundImage: `url(${abstractTravel})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative text-center p-6">
                <h1 className="text-6xl font-extrabold mb-4 text-red-500">The Red Palm Project</h1>
                <p className="text-2xl mb-6 max-w-2xl mx-auto">
                    "Empowering Communities to Find the Missing Through the Power of Modern Data Collection and Web Technologies."
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                    Get Involved
                </button>
            </div>
        </div>
    );
};

export default Hero;

