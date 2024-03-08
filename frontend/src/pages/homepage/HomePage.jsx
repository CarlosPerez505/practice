import React, { useState, useEffect } from 'react';
import Map from "../../components/map/Map.jsx";
import Carousel from '../../components/carousel/Carousel.jsx'
import './HomePage.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
    const [women, setWomen] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/missingCases')
            .then(response => response.json())
            .then(data => setWomen(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <div className="Homepage">
           <Map/>
            <header className="App-header">
                <h1>Missing Women</h1>
                <Carousel women={women}/>
            </header>
        </div>
    );
}

export default HomePage;
