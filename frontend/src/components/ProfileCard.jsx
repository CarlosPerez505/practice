import React from 'react';
import { Link } from "react-router-dom";

const ProfileCard = ({ profile }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white">
            <img src={profile.photo1} alt={`${profile.name}'s picture`} loading="lazy" className="w-full h-48 object-contain" />

            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{profile.name}</div>
                <p className="text-gray-400 text-base">
                    Age: {profile.age}
                </p>
                <p className="text-gray-400 text-base">
                    Last Seen: {profile.lastSeenDate}
                </p>
                <p className="text-gray-400 text-base">
                    Location: {profile.lastSeenLocation}
                </p>
                <p className="text-gray-400 text-base">
                    Description: {profile.description}
                </p>
                <p className="text-gray-400 text-base">
                    Reported Date: {profile.reportedDate}
                </p>
            </div>
            <div className="px-6 py-4">
                <Link to={`/profile/${profile.id}`} className="text-blue-500 hover:underline">
                    View More
                </Link>
            </div>
        </div>
    );
};

export default ProfileCard;

