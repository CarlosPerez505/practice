// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Map from "../../components/map/Map.jsx";
import Carousel from '../../components/carousel/Carousel.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "../../components/Hero.jsx";
import ProfilesList from "../../components/ProfileList.jsx";
import LoadingScreen from "./../../components/loadingScreen.jsx";
import ProfileDetails from '../../components/ProfileDetails.jsx';
import { setSelectedProfile, clearSelectedProfile } from '../../redux/slices/selectedProfileSlice';
import About from "../../components/About.jsx";
import MMIPChart from "../../components/MMIPChart.jsx";
import MoreStatistics from "../../components/MoreStatistics.jsx";
import Contact from "../../components/Contact.jsx";
import TranslateToNavajo from '../../components/TranslateToNavajo';

function HomePage() {
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const selectedProfile = useSelector(state => state.selectedProfile);
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const response = await fetch('http://10.0.0.163:5000/api/missingCases');
            const data = await response.json();
            setProfiles(data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleProfileClick = (profile) => {
        dispatch(setSelectedProfile(profile));
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    const textContents = {
        Hero: "Empowering Communities to Find the Missing Through the Power of Modern Data Collection and Web Technologies.",
        About: "The Red Palm Project is an innovative and dedicated initiative aimed at raising awareness and providing comprehensive information about missing Indigenous people, particularly in the Southwest region.",
        Map: "Interactive Mapping: Integrated with Mapbox, the application provides a visual representation of missing persons' last known locations, enhancing the search and awareness efforts."
    };

    return (
        <div className="Homepage bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end min-h-screen">
            <Hero />
            <About/>
            <div className="mt-8">
                <MMIPChart />
                <MoreStatistics />
            </div>
            <div id="map" className="container mx-auto p-4">
                <Map />
                <header className="App-header my-8 text-center">
                    <h1 id="profiles" className="text-4xl font-bold text-white">Missing People</h1>
                </header>

                <div className="mt-8">
                    <h1 className="text-3xl font-bold text-center my-4 text-white">Missing Persons Profiles</h1>
                    <ProfilesList profiles={profiles} onProfileClick={handleProfileClick} />
                    {selectedProfile && (
                        <ProfileDetails profile={selectedProfile} onClose={() => dispatch(clearSelectedProfile())} />
                    )}
                </div>
                <Contact/>
            </div>
            <TranslateToNavajo texts={textContents} />
        </div>
    );
}

export default HomePage;


