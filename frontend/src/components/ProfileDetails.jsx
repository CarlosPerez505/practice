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

    return <div className="container mx-auto p-4">
        <div className="max-w-lg mx-auto bg-black shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
                <p><strong>Aliases:</strong></p>
                <p><strong>Date of Disappearance:</strong>{profile.lastSeenDate}</p>
                <p><strong>Date of Birth:</strong>{profile.dateOfBirth}</p>
                <p><strong>Eye Color:</strong>{profile.eyeColor}</p>
                <p><strong>Favorite Hangout Places:</strong></p>
                <p><strong>Hair Color:</strong>{profile.hairColor}</p>
                <p><strong>Height:</strong>{profile.height}</p>
                <p><strong>Hobbies and Interests:</strong></p>
                <p><strong>Identifying Marks:</strong>{profile.identifyingMarks}</p>
                <p><strong>Last Location:</strong>{profile.lastSeenLocation}</p>
                <p><strong>Latitude:</strong>{profile.latitude}</p>
                <p><strong>Longitude:</strong>{profile.longitude}</p>
                <p><strong>Tribe:</strong>{profile.tribe}</p>
                <p><strong>Weight:</strong>{profile.weight}</p>
                <p><strong>Photo</strong><img src={profile.photo1} alt="profile picture"/></p>

            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold mt-4 mb-2">Vehicle Information</h2>
                <p><strong>Color:</strong></p>
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
    </div>;
};

export default ProfileDetails;
