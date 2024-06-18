// src/App.js
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage.jsx';
import CreateMissingCase from './pages/AdminPage/CreateMissingCase.jsx';
import ProfileDetails from './components/ProfileDetails.jsx';
import AdminDash from './pages/AdminPage/AdminDash.jsx';
import UpdateForm from './pages/AdminPage/UpdateForm.jsx';
import Navbar from './components/Navbar.jsx';
import SearchCases from './components/SearchCases/SearchCases.jsx';
import Footer from './components/Footer.jsx';

function App() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const [selectedProfile, setSelectedProfile] = useState(null);

    const handleProfileSelect = (profile) => {
        setSelectedProfile(profile);
    };

    const handleProfileClose = () => {
        setSelectedProfile(null);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {!isAdminRoute && <Navbar />}
            <Routes>
                <Route path="/" element={<HomePage onProfileSelect={handleProfileSelect} />} />
                <Route path="/profile/:id" element={<ProfileDetails profile={selectedProfile} onClose={handleProfileClose} />} />
                <Route path="/admin/*" element={<AdminDash />}>
                    <Route path="create" element={<CreateMissingCase />} />
                    <Route path="update/:id" element={<UpdateForm />} />
                    <Route path="search" element={<SearchCases />} />
                </Route>
            </Routes>
            {!isAdminRoute && <Footer />}
            {selectedProfile && <ProfileDetails profile={selectedProfile} onClose={handleProfileClose} />}
        </div>
    );
}

export default App;




