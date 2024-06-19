import React from 'react';
import ProfileCard from './ProfileCard';

const ProfilesList = ({ profiles, onProfileClick }) => {
    return (
        <div className="profiles-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {profiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} onProfileClick={onProfileClick} />
            ))}
        </div>
    );
};

export default ProfilesList;



