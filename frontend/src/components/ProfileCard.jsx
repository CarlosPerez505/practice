import React from 'react';
import {Link} from "react-router-dom";

const ProfileCard = ({ profile }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={profile.picture} alt={`${profile.name}'s picture`} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{profile.name}</div>
                <p className="text-gray-700 text-base">
                    Age: {profile.age}
                </p>
                <p className="text-gray-700 text-base">
                    Last Seen: {profile.lastSeenDate}
                </p>
                <p className="text-gray-700 text-base">
                    Location: {profile.lastSeenLocation}
                </p>
                <p className="text-gray-700 text-base">
                    Description: {profile.description}
                </p>
                <p className="text-gray-700 text-base">
                    Reported Date: {profile.reportedDate}
                </p>
            </div>
            <Link to={`/profile/${profile.id}`} className="text-blue-500">View More</Link>
        </div>
    );
};

export default ProfileCard;
