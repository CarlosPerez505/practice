import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [selectedProfile, setSelectedProfile] = useState(null);

    const clearSelectedProfile = () => setSelectedProfile(null);

    return (
        <ProfileContext.Provider value={{ selectedProfile, setSelectedProfile, clearSelectedProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
