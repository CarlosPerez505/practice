import React from 'react';

const ProfileDetails = ({ profile, onClose }) => {
    if (!profile) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-gray-200 w-full h-full md:w-4/5 md:h-4/5 lg:w-3/5 lg:h-3/5 p-8 overflow-auto relative rounded-xl shadow-neumorphism">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-red-500 bg-white rounded-full p-2 shadow-inner-neumorphism"
                >
                    Close
                </button>
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900">{profile.name}</h1>
                    <p>
                        <strong>Photo:</strong>{' '}
                        {profile.photo1 ? <img src={profile.photo1} alt="Profile" className="max-w-full h-auto mt-4 mx-auto rounded-lg shadow-inner-neumorphism" /> : 'Not available'}
                    </p>
                </div>
                <div className="space-y-4 text-gray-900 text-center mt-6">
                    <p><strong>Age:</strong> {profile.age || 'Not available'}</p>
                    <p><strong>Aliases:</strong> {profile.aliases || 'Not available'}</p>
                    <p><strong>Date of Disappearance:</strong> {profile.lastSeenDate || 'Not available'}</p>
                    <p><strong>Date of Birth:</strong> {profile.dateOfBirth || 'Not available'}</p>
                    <p><strong>Eye Color:</strong> {profile.eyeColor || 'Not available'}</p>
                    <p><strong>Hair Color:</strong> {profile.hairColor || 'Not available'}</p>
                    <p><strong>Height:</strong> {profile.height || 'Not available'}</p>
                    <p><strong>Weight:</strong> {profile.weight || 'Not available'}</p>
                    <p><strong>Sex:</strong> {profile.sex || 'Not available'}</p>
                    <p><strong>Tribe:</strong> {profile.tribe || 'Not available'}</p>
                    <p><strong>Identifying Marks:</strong> {profile.identifyingMarks || 'Not available'}</p>
                    <p><strong>Last Known Location:</strong> {profile.lastSeenLocation || 'Not available'}</p>
                    <p><strong>Latitude:</strong> {profile.lastLatitude || 'Not available'}</p>
                    <p><strong>Longitude:</strong> {profile.lastLongitude || 'Not available'}</p>
                    <p><strong>Hobbies and Interests:</strong> {profile.hobbiesAndInterests || 'Not available'}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
