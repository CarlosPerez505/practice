import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link from react-router-dom
import './SearchCases.css'

function SearchCases({ onSelectCase }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [cases, setCases] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        // You might also want to implement a live search or debouncing here
    };

    const handleSearch = () => {
        console.log("Searching for:", searchTerm);
        fetch('http://localhost:5000/api/missingCases/search?term=' + encodeURIComponent(searchTerm))
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
        <div className="flex justify-center">
            <div className="mt-14 w-6/12">
                <p>
                    Search cases in the database or create a new case below
                </p>
                <input className="p-3"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search cases..."
                />
                <button className="bg-primary text-white p-2 rounded mt-5 mb-5" onClick={handleSearch}>Search</button>
                <ul>
                    {cases.map((caseItem) => (
                        <li key={caseItem.id} onClick={() => onSelectCase(caseItem)}>
                            {caseItem.name} - {caseItem.age} - {caseItem.lastSeenDate} - {caseItem.lastSeenLocation} - {caseItem.description} - {caseItem.reportedDate}
                            <Link to={`/admin/update/${caseItem.id}`}>Edit</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchCases;
