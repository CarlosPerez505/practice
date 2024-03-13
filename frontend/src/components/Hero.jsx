import React from 'react';

const Hero = () => {
    return (
        <div className="bg-white text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        Heading for the Hero Section
                    </h1>
                    <p className="mb-8 leading-relaxed">
                        Here's a compelling paragraph of text where you can add details about your social issue. Explain why it matters and encourage visitors to take action.
                    </p>
                    <div className="flex justify-center">
                        <button className="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-highlight rounded text-lg">
                            Call to Action
                        </button>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    {/* Placeholder for an image */}
                    <img
                        className="object-cover object-center rounded"
                        alt="hero"
                        src="../assets/react.svg" // Replace with your image path
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
