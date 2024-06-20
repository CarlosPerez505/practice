import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import CreateMissingCase from './pages/AdminPage/CreateMissingCase';
import ProfileDetails from './components/ProfileDetails';
import AdminDash from './pages/AdminPage/AdminDash';
import UpdateForm from './pages/AdminPage/UpdateForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PredictionComponent from './components/SearchCases/PredictionComponent';




function App() {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile/:id" element={<ProfileDetails />} />
                <Route path="/admin/*" element={<AdminDash />}>
                    <Route path="create" element={<CreateMissingCase />} />
                    <Route path="update/:id" element={<UpdateForm />} />
                </Route>
                <Route path="/prediction" element={<PredictionComponent />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;





