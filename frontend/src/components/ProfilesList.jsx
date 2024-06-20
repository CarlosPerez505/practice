import React from 'react';
import ProfileCard from './ProfileCard';

const ProfilesList = ({ profiles, onProfileClick }) => {
    if (!Array.isArray(profiles) || profiles.length === 0) {
        return <div className="text-white text-center">No profiles available.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile) => (
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





