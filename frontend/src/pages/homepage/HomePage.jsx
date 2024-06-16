import React, { useState, useEffect } from 'react';
import Map from "../../components/map/Map.jsx";
import Carousel from '../../components/carousel/Carousel.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "../../components/Hero.jsx";
import ProfilesList from "../../components/ProfileList.jsx";
import LoadingScreen from "./../../components/loadingScreen.jsx";

function HomePage() {
    const [women, setWomen] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        fetch('http://10.0.0.163:5000/api/missingCases')
            .then(response => response.json())
            .then(data => {
                setWomen(data);
                setProfiles(data);
            })
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="Homepage">
            <Hero />
            <Carousel women={women} />
            <Map />
            <header className="App-header">
                <h1>Missing Women</h1>
            </header>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center my-4">Missing Persons Profiles</h1>
                <ProfilesList profiles={profiles} />
            </div>
        </div>
    );
}

export default HomePage;

