import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage.jsx'; // Adjust the import path as necessary
import CreateMissingCase from './pages/AdminPage/CreateMissingCase.jsx'; // Adjust the import path as necessary
import Navbar from "./components/navbar/Navbar.jsx";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<CreateMissingCase />} />
                {/* Define other routes here */}
            </Routes>
        </Router>
    );
}

export default App;
