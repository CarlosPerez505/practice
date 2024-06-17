import React from 'react';

const ProfilesList = ({ profiles, onProfileClick }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {profiles.map(profile => (
                <div
                    key={profile.id}
                    className="bg-gray-200 rounded-xl shadow-neumorphism p-6 m-4 transform hover:scale-105 transition-transform duration-300"
                >
                    <img
                        src={profile.photo1 || "https://via.placeholder.com/150"}
                        alt={`${profile.name}'s picture`}
                        className="w-full h-48 object-cover rounded-lg mb-4 shadow-inner-neumorphism"
                    />
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                        <p className="text-gray-600">Age: {profile.age}</p>
                        <p className="text-gray-600">Last Seen: {profile.lastSeenDate}</p>
                        <p className="text-gray-600">Location: {profile.lastSeenLocation}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-inner-neumorphism hover:bg-blue-700 transition duration-300"
                            onClick={() => onProfileClick(profile)}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProfilesList;

