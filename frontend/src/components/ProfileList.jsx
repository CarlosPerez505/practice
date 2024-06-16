import React from 'react';
import ProfileCard from './ProfileCard';

const ProfilesList = ({ profiles }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {profiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
            ))}
        </div>
    );
};

export default ProfilesList;
