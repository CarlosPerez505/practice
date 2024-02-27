import React, { useState } from 'react';

function SearchCases({ onSelectCase }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [cases, setCases] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        // You might also want to implement a live search or debouncing here
    };

    const handleSearch = () => {
        console.log("Searching for:", searchTerm);
        fetch('http://localhost:5000/api/missing_cases/search?term=' + encodeURIComponent(searchTerm))
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json(); // Use text() to read the response and not assume it's JSON
            })
            .then(data => {
                    console.log("Data received:", data);
                    setCases(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    };




    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search cases..."
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {cases.map((caseItem) => (
                    <li key={caseItem.id} onClick={() => onSelectCase(caseItem)}>
                        {caseItem.name} - {caseItem.last_seen_date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchCases;
