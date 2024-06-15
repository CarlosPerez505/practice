import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage.jsx'; // Adjust the import path as necessary
import CreateMissingCase from './pages/AdminPage/CreateMissingCase.jsx'; // Adjust the import path as necessary
import Navbar from "./components/navbar/Navbar.jsx";
import UpdateForm from "./pages/AdminPage/UpdateForm.jsx";
import ProfileDetails from "./components/ProfileDetails.jsx";
import AdminDash from "./pages/AdminPage/AdminDash.jsx";
import SearchCases from "./components/SearchCases/SearchCases.jsx";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile/:id" element={<ProfileDetails />} />
                <Route path="/admin" element={<AdminDash />}>
                    <Route path="create" element={<CreateMissingCase />} />
                    <Route path="search" element={<SearchCases />} />
                    <Route path="update/:id" element={<UpdateForm />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
