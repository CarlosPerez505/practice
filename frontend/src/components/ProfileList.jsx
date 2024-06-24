// src/components/ProfilesList.jsx
import React from 'react';
import ProfileCard from './ProfileCard.jsx';

const ProfilesList = ({ profiles, onProfileClick }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {profiles.map(profile => (
                <ProfileCard
                    key={profile.id}
                    profile={profile}
                    onProfileClick={onProfileClick}
                />
            ))}
        </div>
    );
};

export default ProfilesList;




