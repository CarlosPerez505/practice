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
            <div className="flex justify-center mt-14">
                <p className="p-5">
                    This is a map displaying all the last seen locations of missing indigenous women in New Mexico
                </p>
            </div>
           <Map/>
            <header className="App-header">
                <h1>Missing Women</h1>
                <Carousel women={women}/>
            </header>
        </div>
    );
}

export default HomePage;
