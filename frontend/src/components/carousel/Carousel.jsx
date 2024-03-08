import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css'






function Carousel({women}) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
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
export default Carousel;
