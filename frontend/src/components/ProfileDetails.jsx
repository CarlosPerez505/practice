import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProfileDetails = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetch(`http://10.0.0.163:5000/api/missingCases/${id}`)
            .then(response => response.json())
            .then(data => setProfile(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-lg mx-auto bg-black shadow-md rounded-lg overflow-hidden">

                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-2">name</h1>
                    <p><strong>Aliases:</strong></p>
                    <p><strong>Date of Disappearance:</strong></p>
                    <p><strong>Date of Birth:</strong></p>
                    <p><strong>Eye Color:</strong></p>
                    <p><strong>Favorite Hangout Places:</strong></p>
                    <p><strong>Hair Color:</strong></p>
                    <p><strong>Height:</strong></p>
                    <p><strong>Hobbies and Interests:</strong></p>
                    <p><strong>Identifying Marks:</strong></p>
                    <p><strong>Last Location:</strong></p>
                    <p><strong>Latitude:</strong></p>
                    <p><strong>Longitude:</strong></p>
                    <p><strong>Tribe:</strong></p>
                    <p><strong>Weight:</strong></p>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-bold mt-4 mb-2">Vehicle Information</h2>
                    <p><strong>Color:</strong> </p>
                    <p><strong>Description:</strong></p>
                    <p><strong>Make:</strong> </p>
                    <p><strong>Model:</strong> </p>
                    <p><strong>Plate Number:</strong> </p>
                    <p><strong>Year:</strong> </p>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-bold mt-4 mb-2">Social Media</h2>
                    <p><strong>Facebook:</strong> </p>
                    <p><strong>Instagram:</strong> </p>
                    <p><strong>Ticktock:</strong> </p>
                    <p><strong>Twitter:</strong> </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
