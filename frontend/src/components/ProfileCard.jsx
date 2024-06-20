import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';

const ProfileCard = ({ profile, onProfileClick }) => {
    const navigate = useNavigate();
    const placeholderImage = "https://dummyimage.com/300x300/000/fff.png&text=No+Image"; // Placeholder image URL
    const [isLoading, setIsLoading] = useState(true);

    const handleClick = () => {
        if (window.innerWidth <= 768) {
            navigate(`/profile/${profile.id}`);
        } else {
            onProfileClick(profile);
        }
    };

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <div
            className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-neumorphism bg-gray-800 text-white m-4 cursor-pointer"
            style={{ minHeight: '450px', width: '300px' }} // Set a minimum height and fixed width for the card
            onClick={handleClick}
        >
            <div className="relative w-full h-64 bg-gray-700 flex items-center justify-center">
                {isLoading && (
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 md:h-16 md:w-16"></div>
                )}
                <img
                    src={profile.photo1 || placeholderImage}
                    alt={`${profile.name}'s picture`}
                    loading="lazy"
                    className={`object-cover w-full h-full ${isLoading ? 'hidden' : 'block'}`}
                    onLoad={handleImageLoad}
                />
            </div>
            <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                <div className="font-bold text-xl mb-2 text-center md:text-left">{profile.name}</div>
                <p className="text-gray-400 text-center md:text-left">Age: {profile.age}</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <a href="#" className="text-blue-500 hover:text-blue-400">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="text-blue-500 hover:text-blue-400">
                        <FaLinkedinIn />
                    </a>
                    <a href="#" className="text-pink-500 hover:text-pink-400">
                        <FaInstagram />
                    </a>
                    <a href="#" className="text-blue-400 hover:text-blue-300">
                        <FaTwitter />
                    </a>
                </div>
            </div>
            <div className="text-center py-4">
                <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full">
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;
