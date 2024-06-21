// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import { SidebarProvider } from './context/SidebarContext';
import HomePage from './pages/homepage/HomePage';
import AdminDash from './pages/AdminPage/AdminDash';
import CreateMissingCase from './pages/AdminPage/CreateMissingCase';
import UpdateForm from './pages/AdminPage/UpdateForm';
import PredictionComponent from './components/SearchCases/PredictionComponent';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProfileDetails from './components/ProfileDetails';
import SearchCases from "./pages/AdminPage/SearchCases.jsx";

function App() {
    return (
        <ProfileProvider>
            <SidebarProvider>
                <div className="bg-gray-900 text-white min-h-screen flex flex-col">
                    <Router>
                        <Navbar />
                        <div className="main-content flex-1">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/profile/:id" element={<ProfileDetails />} />
                                <Route path="/admin/*" element={<AdminDash />}>
                                    <Route path="create" element={<CreateMissingCase />} />
                                    <Route path="update/:id" element={<UpdateForm />} />
                                    <Route path="search" element={<SearchCases />} />
                                </Route>
                                {/* Add other routes here */}
                            </Routes>
                        </div>
                        <Footer />
                    </Router>
                </div>
            </SidebarProvider>
        </ProfileProvider>
    );
}

export default App;




