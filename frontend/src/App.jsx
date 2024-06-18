import React from 'react';
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

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {!isAdminRoute && <Navbar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile/:id" element={<ProfileDetails />} />
                <Route path="/admin/*" element={<AdminDash />}>
                    <Route path="create" element={<CreateMissingCase />} />
                    <Route path="update/:id" element={<UpdateForm />} />
                    <Route path="search" element={<SearchCases />} />
                </Route>
            </Routes>
            {!isAdminRoute && <Footer />}
        </div>
    );
}

export default App;




