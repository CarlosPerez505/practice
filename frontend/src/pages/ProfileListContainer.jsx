// src/components/ProfileList.jsx
import React from 'react';

const ProfilesList = ({ profiles, onProfileClick }) => {
    return (
        <div>
            {profiles.map(profile => (
                <div key={profile.id} onClick={() => onProfileClick(profile)}>
                    {profile.name}
                </div>
            ))}
        </div>
    );
};

export default ProfilesList; // Ensure this is the default export

