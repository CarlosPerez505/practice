import React from 'react';
import abstractTravel from'./../assets/abstract-travel.jpg';

const Hero = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">The Red PaLm Project</h1>
                <p className="text-xl mb-6">
                    Here's a compelling paragraph of text where you can add details about your social issue.
                    Explain why it matters and encourage visitors to take action.
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                    Call to Action
                </button>
            </div>
        </div>
    );
};

export default Hero;
