import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ProfilePage = ({ profile, onClose }) => {
    if (!profile) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 md:p-8">
            <div className="bg-gray-800 w-full md:w-4/5 lg:w-3/5 h-auto md:h-4/5 p-4 md:p-8 overflow-auto relative rounded-xl shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 transition duration-200 bg-gray-700 rounded-full p-2 shadow-lg z-50"
                >
                    <FaTimes size={20} />
                </button>
                <div className="text-center">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white">{profile.name}</h1>
                    {profile.photo1 ? (
                        <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-4">
                            <img
                                src={profile.photo1}
                                alt="Profile"
                                className="object-cover rounded-full shadow-lg"
                            />
                        </div>
                    ) : (
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-gray-200">No Image</span>
                        </div>
                    )}
                </div>
                <div className="space-y-4 text-gray-300 text-center mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><strong>Age:</strong> {profile.age || 'Not available'}</div>
                        <div><strong>Aliases:</strong> {profile.aliases || 'Not available'}</div>
                        <div><strong>Date of Disappearance:</strong> {profile.lastSeenDate || 'Not available'}</div>
                        <div><strong>Date of Birth:</strong> {profile.dateOfBirth || 'Not available'}</div>
                        <div><strong>Eye Color:</strong> {profile.eyeColor || 'Not available'}</div>
                        <div><strong>Hair Color:</strong> {profile.hairColor || 'Not available'}</div>
                        <div><strong>Height:</strong> {profile.height || 'Not available'}</div>
                        <div><strong>Weight:</strong> {profile.weight || 'Not available'}</div>
                        <div><strong>Sex:</strong> {profile.sex || 'Not available'}</div>
                        <div><strong>Tribe:</strong> {profile.tribe || 'Not available'}</div>
                        <div><strong>Identifying Marks:</strong> {profile.identifyingMarks || 'Not available'}</div>
                        <div><strong>Last Known Location:</strong> {profile.lastSeenLocation || 'Not available'}</div>
                        <div><strong>Latitude:</strong> {profile.lastLatitude || 'Not available'}</div>
                        <div><strong>Longitude:</strong> {profile.lastLongitude || 'Not available'}</div>
                        <div><strong>Hobbies and Interests:</strong> {profile.hobbiesAndInterests || 'Not available'}</div>
                    </div>
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;






