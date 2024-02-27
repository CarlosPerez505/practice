import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage.jsx'; // Adjust the import path as necessary
import UpdatePage from './pages/updatepage/UpdatePage.jsx'; // Adjust the import path as necessary
import Navbar from "./components/navbar/Navbar.jsx";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/update" element={<UpdatePage />} />
                {/* Define other routes here */}
            </Routes>
        </Router>
    );
}

export default App;
