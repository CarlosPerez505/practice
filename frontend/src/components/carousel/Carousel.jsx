import React, { useState, useEffect } from 'react';

const Carousel = ({ women }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    let startX = 0;

    useEffect(() => {
        console.log('Women data:', women); // Add this line to check if data is passed
    }, [women]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % women.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + women.length) % women.length);
    };

    const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            nextSlide();
        } else if (endX - startX > 50) {
            prevSlide();
        }
    };

    useEffect(() => {
        const track = document.querySelector('.carousel-track');
        track.addEventListener('touchstart', handleTouchStart);
        track.addEventListener('touchend', handleTouchEnd);
        return () => {
            track.removeEventListener('touchstart', handleTouchStart);
            track.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <div className="relative w-full max-w-lg mx-auto">
            <div className="overflow-hidden relative h-80">
                <div
                    className="carousel-track flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {women.map((woman, index) => (
                        <div key={woman.id} className="min-w-full h-80 flex flex-col items-center justify-center bg-gray-300 p-4">
                            {women.length === 0 ? (
                                <p>Loading...</p>
                            ) : (
                                <>
                                    <img
                                        src={`https://via.placeholder.com/150x150?text=${woman.name}`}
                                        alt={`Placeholder for ${woman.name}`}
                                        className="object-cover h-24 w-24 mb-4"
                                    />
                                    <h3 className="text-lg font-bold">{woman.name}</h3>
                                    <p><strong>Age:</strong> {woman.age}</p>
                                    <div className="text-center">
                                        <p><strong>Last Seen Date:</strong> {woman.lastSeenDate}</p>
                                        <p><strong>Last Seen Location:</strong> {woman.lastSeenLocation}</p>
                                        <p><strong>Description:</strong> {woman.description}</p>
                                        <p><strong>Reported Date:</strong> {woman.reportedDate}</p>
                                    </div>
                                </>
                            )}
                        </div>

                    ))}
                </div>
            </div>
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
            >
                ‹
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
            >
                ›
                yo help

            </button>
        </div>
    );
};

export default Carousel;



/* import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css'






function Carousel({women}) {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {women.map((woman) => (
                    <div key={woman.id} className="slide">
                        <img
                            // src={placeholderImage} // Your local placeholder image
                            // Or use a remote placeholder image
                            src={`https://via.placeholder.com/150x150?text=${woman.name}`}
                            alt={`Placeholder for ${woman.name}`}
                            className="slide-image"
                        />
                        <h3>{woman.name}</h3>
                        <p><strong>Age:</strong> {woman.age}</p>
                        <div className="text-container">
                            <p><strong>Last Seen date:</strong> {woman.lastSeenDate}</p>
                            <p><strong>Last seen location:</strong> {woman.lastSeenLocation}</p>
                            <p><strong>Description:</strong> {woman.description}</p>
                            <p><strong>Reported Date:</strong> {woman.reportedDate}</p>
                        </div>

                    </div>
                ))}
            </Slider>
        </div>
    );
}
export default Carousel; */
