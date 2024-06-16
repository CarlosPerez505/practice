import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage.jsx';
import CreateMissingCase from './pages/AdminPage/CreateMissingCase.jsx';
import ProfileDetails from './components/ProfileDetails.jsx';
import AdminDash from './pages/AdminPage/AdminDash.jsx';
import UpdateForm from './pages/AdminPage/UpdateForm.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import SearchCases from './components/SearchCases/SearchCases.jsx';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile/:id" element={<ProfileDetails />} />
                <Route path="/admin" element={<AdminDash />}>
                    <Route path="create" element={<CreateMissingCase />} />
                    <Route path="update/:id" element={<UpdateForm />} />
                    <Route path="search" element={<SearchCases />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
