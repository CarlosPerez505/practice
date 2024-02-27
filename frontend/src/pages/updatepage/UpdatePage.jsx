import React, { useState } from 'react';
import './UpdatePage.css';
import SearchCases from "../../components/SearchCases/SearchCases.jsx";

function UpdatePage() {
    // Initialize formData with the structure of your case object
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        lastSeenDate: '', // Make sure the names match your database columns
        description: '',
    });

    // State hooks for UI feedback messages
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleSelectCase = (caseItem) => {
        // Update formData with the selected case details
        setFormData({
            id: caseItem.id,
            name: caseItem.name,
            lastSeenDate: caseItem.last_seen_date, // Ensure this matches your data structure
            description: caseItem.description,
        });
        // Reset the success and error messages when a new case is selected
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/missing_cases/${formData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                last_seen_date: formData.lastSeenDate,
                description: formData.description,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setShowSuccessMessage(true);
                setShowErrorMessage(false);
                // Optionally, clear the form or reset to initial state
                setFormData({
                    id: '',
                    name: '',
                    lastSeenDate: '',
                    description: '',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                setShowErrorMessage(true);
                setShowSuccessMessage(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Update Missing Case</h1>
            {showSuccessMessage && <div className="success-message">Case updated successfully!</div>}
            {showErrorMessage && <div className="error-message">Error updating case. Please try again.</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="ID"
                    required
                />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="date"
                    name="lastSeenDate"
                    value={formData.lastSeenDate}
                    onChange={handleChange}
                    placeholder="Last Seen Date"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <button type="submit">Update</button>
            </form>
            <SearchCases onSelectCase={handleSelectCase} />
        </div>
    );
}

export default UpdatePage;
