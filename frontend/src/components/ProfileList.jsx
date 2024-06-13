import React from 'react';
import ProfileCard from './ProfileCard';

const ProfilesList = ({ profiles }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map(profile => (
                <ProfileCard key={profile.id} profile={profile} />
            ))}
        </div>
    );
};

export default ProfilesList;

