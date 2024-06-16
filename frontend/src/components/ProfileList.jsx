import React from 'react';
import ProfileCard from './ProfileCard.jsx';

const ProfilesList = ({ profiles }) => (
    <div className="flex flex-wrap -mx-2">
        {profiles.map((profile, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <ProfileCard profile={profile} />
            </div>
        ))}
    </div>
);

export default ProfilesList;
