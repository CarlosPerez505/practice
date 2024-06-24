import React, { useState, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import Hero from "../../components/Hero.jsx";
import ProfilesList from "../../components/ProfileList.jsx";
import ProfileDetails from '../ProfilePage.jsx';
import About from "../../components/About.jsx";
import MMIPChart from "../../components/MMIPChart.jsx";
import Contact from "../../components/Contact.jsx";
import StackedBarChart from "../../components/StackedBarChart.jsx";
import RadarChart from "../../components/RadarChart.jsx";
import ProfilePage from "../ProfilePage.jsx";
import ApexBarChart from "../../components/apexBarChart.jsx";
import ApexPieChart from "../../components/apexPieChart.jsx";

function HomePage() {
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/missingCases`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            console.log('Fetched data:', data); // Debugging log

            if (Array.isArray(data)) {
                setProfiles(data);
            } else {
                throw new Error('Fetched data is not an array');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
            setProfiles([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleProfileClick = (profile) => {
        setSelectedProfile(profile);
    };

    const handleCloseModal = () => {
        setSelectedProfile(null);
    };

    return (
        <div className="Homepage bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end min-h-screen">
            <Hero />
            <About />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
                <div>
                    <MMIPChart />
                    <StackedBarChart />
                </div>
                <RadarChart />
                <ApexBarChart/>
                <ApexPieChart/>
            </div>
            <div id="map" className="container mx-auto p-4">
                <header className="App-header my-8 text-center">
                    <h1 id="profiles" className="text-4xl font-bold text-white">Missing People</h1>
                </header>
                <div className="mt-8">
                    <h1 className="text-3xl font-bold text-center my-4 text-white">Missing Persons Profiles</h1>
                    {isLoading ? (
                        <div className="text-center text-white">Loading...</div>
                    ) : error ? (
                        <div className="text-red-500 text-center">{error}</div>
                    ) : (
                        <ProfilesList profiles={profiles} onProfileClick={handleProfileClick} />
                    )}
                    {selectedProfile && (
                        <ProfilePage profile={selectedProfile} onClose={handleCloseModal} />
                    )}
                </div>
                <Contact />
            </div>
        </div>
    );
}

export default HomePage;




