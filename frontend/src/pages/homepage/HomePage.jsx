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

function HomePage() {
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const selectedProfile = useSelector((state) => state.selectedProfile);

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

    if (isLoading) {
        console.log('Loading...');
        return <LoadingScreen />;
    }

    console.log('Rendering HomePage with profiles:', profiles);

    return (
        <div className="Homepage">
            <Hero />
            <Carousel women={[]} />
            <Map />
            <header className="App-header">
                <h1>Missing Women</h1>
            </header>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center my-4">Missing Persons Profiles</h1>
                <ProfilesList profiles={profiles} onProfileClick={(profile) => dispatch(setSelectedProfile(profile))} />
                {selectedProfile && (
                    <ProfileDetails profile={selectedProfile} onClose={() => dispatch(clearSelectedProfile())} />
                )}
            </div>
        </div>
    );
}

export default HomePage;
