/*import React, { useState, useEffect } from 'react';
import Map from "../../components/map/Map.jsx";
import Carousel from '../../components/carousel/Carousel.jsx'
import './HomePage.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "../../components/Hero.jsx";
import ProfilesList from "../../components/ProfileList.jsx";

function HomePage() {
    const [women, setWomen] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [results, setResults] = useState([]);

    const fetchData = async () => {
        const response = await fetch('/scrape');
        const data = await response.json();
        setResults(data);
    };


    useEffect(() => {
        fetch('http://10.0.0.163:5000/api/missingCases')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); // Add this line
                setWomen(data);
                setProfiles(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);




    return (
        <div className="Homepage">
            <Hero/>
            <Carousel women={women}/>
           <Map/>
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

export default HomePage; */


import React, { useState, useEffect } from 'react';
import Map from "../../components/map/Map.jsx";
import Carousel from '../../components/carousel/Carousel.jsx';
import './HomePage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "../../components/Hero.jsx";
import ProfilesList from "../../components/ProfileList.jsx";

function HomePage() {
    const [women, setWomen] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [results, setResults] = useState([]);

    const fetchData = async () => {
        const response = await fetch('/scrape');
        const data = await response.json();
        setResults(data);
    };

    useEffect(() => {
        fetch('http://10.0.0.163:5000/api/missingCases')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setWomen(data);
                setProfiles(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="Homepage">
            <Hero/>
            <Carousel women={women}/>
            <Map/>
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
    );
}

export default HomePage;

