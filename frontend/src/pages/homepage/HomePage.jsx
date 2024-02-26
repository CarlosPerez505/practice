import React, { useState, useEffect } from 'react';

function HomePage() {
    const [women, setWomen] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/missing_cases')
            .then(response => response.json())
            .then(data => setWomen(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Missing Women</h1>
                <ul>
                    {women.map(woman => (
                        <li key={woman.id}>{woman.name}</li>
                    ))}
                </ul>
            </header>
        </div>
    );
}

export default HomePage;