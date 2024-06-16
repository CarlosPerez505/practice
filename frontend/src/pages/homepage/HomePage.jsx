import React, { useState, useEffect, Suspense, lazy } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingScreen from "./../../components/loadingScreen.jsx";  // Corrected import path

// Lazy load components
const Map = lazy(() => import("../../components/map/Map.jsx"));
const Carousel = lazy(() => import('../../components/carousel/Carousel.jsx'));
const Hero = lazy(() => import("../../components/Hero.jsx"));
const ProfilesList = lazy(() => import("../../components/ProfileList.jsx"));

function HomePage() {
    const [women, setWomen] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    const fetchData = async () => {
        try {
            const response = await fetch('/scrape');
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false); // Set loading to false when data is fetched
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
            .finally(() => setIsLoading(false)); // Set loading to false when data is fetched
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Suspense fallback={<LoadingScreen />}>
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
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold text-center my-4">Scraper Results</h1>
                    <button onClick={fetchData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Fetch Data
                    </button>
                    <ul>
                        {results.map((article, index) => (
                            <li key={index}>
                                <a href={article.link} target="_blank" rel="noopener noreferrer">
                                    {article.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Suspense>
    );
}

export default HomePage;
