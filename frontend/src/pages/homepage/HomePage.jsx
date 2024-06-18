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

function HomePage() {
    const [women, setWomen] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const selectedProfile = useSelector(state => state.selectedProfile);
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const response = await fetch('/scrape');
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('Fetching data...');
        fetch('http://10.0.0.163:5000/api/missingCases')
            .then(response => {
                console.log('Response received:', response);
                return response.json();
            })
            .then(data => {
                console.log('Data fetched:', data);
                setProfiles(data);
            })
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => {
                console.log('Fetch complete');
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        console.log('Selected profile:', selectedProfile);
    }, [selectedProfile]);

    const handleProfileClick = (profile) => {
        dispatch(setSelectedProfile(profile));
    };

    if (isLoading) {
        console.log('Loading...');
        return <LoadingScreen />;
    }

    console.log('Rendering HomePage with profiles:', profiles);

    return (
        <div className="Homepage bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end min-h-screen">
            <Hero />
            <About id="about" />
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
                <Contact id="contact" />
            </div>
        </div>
    );
}

export default HomePage;
