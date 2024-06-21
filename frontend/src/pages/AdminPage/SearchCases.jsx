import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from '../../components/DeleteButton.jsx';

function SearchCases({ onSelectCase }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [cases, setCases] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        console.log("Searching for:", searchTerm);
        fetch('http://10.0.0.163:5000/api/missingCases/search?term=' + encodeURIComponent(searchTerm))
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Data received:", data);
                setCases(data);
                setNotFound(data.length === 0);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setNotFound(true);
            });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className="flex justify-center text-gray-900">
            <div className="mt-14 w-full max-w-3xl px-4">
                <p className="mb-4 text-lg text-gray-200">
                    Search cases in the database or create a new case below
                </p>
                <div className="flex flex-col sm:flex-row items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4 text-gray-900">
                    <input
                        className="flex-grow w-full sm:flex-grow-0 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Search cases..."
                        aria-label="Search cases"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-lg w-full sm:w-auto"
                    >
                        Search
                    </button>
                </div>
                {notFound ? (
                    <p className="text-red-500 text-center">Case not found</p>
                ) : (
                    <ul className="space-y-4">
                        {cases.map((caseItem) => (
                            <li
                                key={caseItem.id}
                                className="p-4 border border-gray-600 rounded-lg bg-gray-800 hover:bg-gray-700 text-white flex justify-between items-center"
                                onClick={() => onSelectCase(caseItem)}
                            >
                                <div className="text-gray-300">
                                    <p className="font-semibold text-lg">{caseItem.name} - {caseItem.age}</p>
                                    <p>{caseItem.lastSeenDate} - {caseItem.lastSeenLocation}</p>
                                    <p>{caseItem.description}</p>
                                    <p>Reported Date: {caseItem.reportedDate}</p>
                                    <p>Last Place of Employment: {caseItem.lastPlaceOfEmployment}</p>
                                </div>
                                <div className="flex items-center space-x-4 mt-4">
                                    <Link
                                        to={`/admin/update/${caseItem.id}`}
                                        className="text-blue-500 hover:underline"
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label={`Edit case ${caseItem.name}`}
                                    >
                                        Edit
                                    </Link>
                                    <DeleteButton
                                        caseId={caseItem.id}
                                        onDeleteSuccess={() => {
                                            // Remove the deleted case from the list
                                            setCases(cases.filter(item => item.id !== caseItem.id));
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default SearchCases;

