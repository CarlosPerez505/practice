import React, { useState, useEffect } from 'react';

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
            <header className="App-header">
                <h1>Missing Women</h1>
                <div>
                    {women.map(woman => (
                        <div key={woman.id}>
                            <h2>{woman.name}</h2>
                            <p><strong>Age:</strong> {woman.age}</p>
                            <p><strong>Last Seen date:</strong> {woman.lastSeenDate}</p>
                            <p><strong>Last seen location:</strong> {woman.lastSeenLocation}</p>
                            <p><strong>Description:</strong> {woman.description}</p>
                            <p><strong>Reported Date:</strong> {woman.reportedDate}</p>
                            {/* Add other details as needed */}
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
}

export default HomePage;
