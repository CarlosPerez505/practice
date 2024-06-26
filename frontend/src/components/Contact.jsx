import React from 'react';

const Contact = () => {
    return (
        <div id="contact" className="bg-gray-800 text-white p-8 rounded-lg shadow-neumorphism w-full lg:w-full mx-auto mt-16 mb-16">
            <h1 className="text-3xl text-center font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-center p-3 leading-relaxed">
                If you have any information regarding the missing persons or if you would like to get involved, please contact us.
            </p>
            <form className="space-y-4">
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold" htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                </div>
                <button type="submit" className="bg-primary text-white p-2 rounded-lg w-full hover:bg-highlight">
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;
