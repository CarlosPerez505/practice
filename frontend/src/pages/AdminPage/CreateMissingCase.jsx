import React, { useState } from 'react';
import './CreateMissingCase.css';
import SearchCases from "../../components/SearchCases/SearchCases.jsx";

function CreateMissingCase() {
    // Initialize formData with the structure of your case object
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        age: '',
        lastSeenDate: '', // Make sure the names match your database columns
        lastSeenLocation:'',
        description: '',
        reportedDate: '',
    });

    // State hooks for UI feedback messages
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [formErrors, setFormErrors] = useState({});


    const handleSelectCase = (caseItem) => {
        // Update formData with the selected case details
        setFormData({
            id: caseItem.id || '',
            name: caseItem.name || '',
            age: caseItem.age || '', // Add age
            lastSeenDate: caseItem.lastSeenDate || '', // Ensure this matches your data structure
            lastSeenLocation: caseItem.lastSeenLocation || '', // Add last_seen_location
            description: caseItem.description || '',
            reportedDate: caseItem.reportedDate || '', // Add reported_date
        });
        // Reset the success and error messages when a new case is selected
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form data
        const errors = validateFormData(formData);
        if (Object.keys(errors).length > 0) {
            // Handle errors
            console.error('Validation errors:', errors);
            // Optionally, display these errors to the user
            setShowErrorMessage('Please correct the errors before submitting.');
            return; // Stop the submission since there are errors
        }

        const requestOptions = {
            method: formData.id ? 'PATCH' : 'POST', // Use PATCH if id exists, otherwise use POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        };

        const endpoint = formData.id
            ? `http://localhost:5000/api/missingCases/${formData.id}` // PATCH endpoint
            : 'http://localhost:5000/api/missingCases'; // POST endpoint

        // Fetch request to either create or update the case
        fetch(endpoint, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setShowSuccessMessage(true);
                setShowErrorMessage(false);
                // Optionally, clear the form or reset to initial state
                setFormData({
                    id: '',
                    name: '',
                    age: '',
                    lastSeenDate: '',
                    lastSeenLocation: '',
                    description: '',
                    reportedDate: '',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                setShowErrorMessage(true);
                setShowSuccessMessage(false);
            });
    };



    const validateFormData = (data) => {
        let errors = {};

        // Validate Name
        if (!data.name.trim()) {
            errors.name = 'Name is required';
        }

        // Validate Age
        if (!data.age) {
            errors.age = 'Age is required';
        } else if (isNaN(data.age) || data.age < 0 || data.age > 120) {
            errors.age = 'Age must be a number between 0 and 120';
        }

        // Validate Last Seen Date
        // Assuming lastSeenDate is in YYYY-MM-DD format
        if (data.lastSeenDate && isNaN(Date.parse(data.lastSeenDate))) {
            errors.lastSeenDate = 'Invalid date format';
        }

        // Validate Last Seen Location
        if (!data.lastSeenLocation.trim()) {
            errors.lastSeenLocation = 'Last seen location is required';
        }

        // Validate Description
        if (!data.description.trim()) {
            errors.description = 'Description is required';
        }

        return errors;
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        // Clear error message for the field if it exists
        if (formErrors[name]) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                [name]: undefined, // Remove the error message for this field
            }));
        }
    };


    return (
        <div className="mc-form-container">
            <SearchCases onSelectCase={handleSelectCase} />
            <h1>Create Missing Case</h1>
            {showSuccessMessage && <div className="success-message">Case updated successfully!</div>}
            {showErrorMessage && <div className="error-message">Error creating missing case. Please try again.</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age || ''}
                        onChange={handleChange}
                        placeholder="Age"
                    />
                    {formErrors.age && <div className="error-message">{formErrors.age}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="date">Last Seen Date</label>
                    <input
                        type="date"
                        name="lastSeenDate"
                        value={formData.lastSeenDate}
                        onChange={handleChange}
                        placeholder="Last Seen Date"
                    />
                    {formErrors.lastSeenDate && <div className="error-message">{formErrors.lastSeenDate}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="lastSeenLocation">Last seen location</label>
                    <input
                        type="text"
                        name="lastSeenLocation"
                        value={formData.lastSeenLocation || ''}
                        onChange={handleChange}
                        placeholder="Last Seen Location"
                    />
                    {formErrors.lastSeenLocation && <div className="error-message">{formErrors.lastSeenLocation}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />
                    {formErrors.description && <div className="error-message">{formErrors.description}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="reportedDate">Reported Date</label>
                    <input
                        type="date"
                        name="reportedDate"
                        value={formData.reportedDate}
                        onChange={handleChange}
                        placeholder="Reported Date"
                    />
                    {formErrors.reportedDate && <div className="error-message">{formErrors.reportedDate}</div>}
                </div>
                <button className="createButton" type="submit">Create</button>
            </form>

        </div>

    );
}

export default CreateMissingCase;
