import React, { useState, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import Map from "../../components/map/Map.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "../../components/Hero.jsx";
import ProfilesList from "../../components/ProfileList.jsx";
import ProfileDetails from '../../components/ProfileDetails.jsx';
import About from "../../components/About.jsx";
import MMIPChart from "../../components/MMIPChart.jsx";
import MoreStatistics from "../../components/MoreStatistics.jsx";
import Contact from "../../components/Contact.jsx";
import StackedBarChart from "../../components/StackedBarChart.jsx";
import RadarChart from "../../components/RadarChart.jsx";

function HomePage() {
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { selectedProfile, setSelectedProfile, clearSelectedProfile } = useProfile();

    const fetchData = async () => {
        try {
            const response = await fetch('http://10.0.0.163:5000/api/missingCases');

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

    return (
        <div className="Homepage bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end min-h-screen">
            <Hero />
            <About />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
                <div>
                    <MMIPChart />
                    <div className="text-white p-4 bg-gray-800 rounded-lg shadow-lg mt-4">
                        <h3 className="text-xl font-bold mb-2">How to Read the Chart:</h3>
                        <p>- <strong>X-axis</strong>: Different years (2016-2023).</p>
                        <p>- <strong>Y-axis</strong>: Number of cases.</p>
                        <p>- <strong>Bars</strong>: Each year's total cases.</p>
                        <p>- <strong>Segments</strong>: Parts of the bar representing different regions.</p>
                        <p>- <strong>Colors</strong>: Different colors for each region (use the legend to identify).</p>
                        <p>- <strong>Read</strong>: Look at bar height for total cases and segment height for regional cases.</p>
                    </div>
                </div>
                <div>
                    <StackedBarChart />
                    <div className="text-white p-4 bg-gray-800 rounded-lg shadow-lg mt-4">
                        <h3 className="text-xl font-bold mb-2">How to Read the Chart:</h3>
                        <p>- <strong>X-axis</strong>: Different years (2020, 2021, 2022, 2023).</p>
                        <p>- <strong>Y-axis</strong>: Number of cases.</p>
                        <p>- <strong>Bars</strong>: Each year's total cases.</p>
                        <p>- <strong>Segments</strong>: Parts of the bar representing different regions.</p>
                        <p>- <strong>Colors</strong>: Different colors for each region (use the legend to identify).</p>
                        <p>- <strong>Read</strong>: Look at bar height for total cases and segment height for regional cases.</p>
                    </div>
                </div>
                <div>
                    <RadarChart />
                    <div className="text-white p-4 bg-gray-800 rounded-lg shadow-lg mt-4">
                        <h3 className="text-lg font-bold">How to Read the Chart:</h3>
                        <ul className="text-xl font-bold mb-2">
                            <li><strong>Axes:</strong> Different attributes (Age, Last Seen Date, Reported Date, Height, Weight).</li>
                            <li><strong>Values:</strong> Each attribute’s value for different cases.</li>
                            <li><strong>Colors:</strong> Different colors for each case (use the legend to identify).</li>
                            <li><strong>Read:</strong> Look at the shape and size of each area to compare the cases.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="map" className="container mx-auto p-4">
                <Map />

                <header className="App-header my-8 text-center">
                    <h1 id="profiles" className="text-4xl font-bold text-white">Missing People</h1>
                </header>

                <div className="mt-8">
                    <h1 className="text-3xl font-bold text-center my-4 text-white">Missing Persons Profiles</h1>
                    {error ? (
                        <div className="text-red-500 text-center">{error}</div>
                    ) : (
                        <ProfilesList profiles={profiles} onProfileClick={handleProfileClick} />
                    )}
                    {selectedProfile && (
                        <ProfileDetails profile={selectedProfile} onClose={clearSelectedProfile} />
                    )}
                </div>
                <Contact />
            </div>
        </div>
    );
}

export default HomePage;



