// Carousel.jsx
import React from 'react';
import Slider from "react-slick";

const Carousel = ({ profiles = [] }) => {
    if (!profiles || profiles.length === 0) {
        return <div>No profiles to display</div>;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {profiles.map((profile, index) => (
                    <div key={index} className="p-4">
                        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white m-4">
                            <img
                                src={profile.photo1 || 'https://via.placeholder.com/150'}
                                alt={`${profile.name}'s picture`}
                                loading="lazy"
                                className="w-full h-48 object-contain bg-gray-700"
                            />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{profile.name}</div>
                                <p className="text-gray-400 text-base">
                                    Age: {profile.age}
                                </p>
                                <p className="text-gray-400 text-base">
                                    Last Seen: {profile.lastSeenDate}
                                </p>
                                <p className="text-gray-400 text-base">
                                    Location: {profile.lastSeenLocation}
                                </p>
                                <p className="text-gray-400 text-base">
                                    Description: {profile.description}
                                </p>
                                <p className="text-gray-400 text-base">
                                    Reported Date: {profile.reportedDate}
                                </p>
                            </div>
                            <div className="px-6 py-4">
                                <a href={`/profile/${profile.id}`} className="text-blue-500 hover:underline">
                                    View More
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
