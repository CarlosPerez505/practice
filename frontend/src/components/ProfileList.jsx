import React from 'react';
import ProfileCard from './ProfileCard.jsx';

const ProfilesList = ({ profiles, onProfileClick }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {profiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} onProfileClick={onProfileClick} />
            ))}
        </div>
    );
};

export default ProfilesList;


