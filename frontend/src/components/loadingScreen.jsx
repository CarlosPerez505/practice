// src/components/LoadingScreen.jsx
import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-800">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
    );
};

export default LoadingScreen;
