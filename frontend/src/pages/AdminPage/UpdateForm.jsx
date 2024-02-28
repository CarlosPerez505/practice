import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateForm = () => {
    const [caseData, setCaseData] = useState({ name: '', age: '', lastSeenDate: '', lastSeenLocation: '', description: '', reportedDate: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch case data to pre-populate the form
        fetch(`/api/missingCases/${id}`)
            .then(response => response.json())
            .then(data => setCaseData(data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCaseData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Correct the method to PUT for update and ensure the URL is correct
        fetch(`/api/missingCases/${id}`, {
            method: 'Patch', // Assuming your API uses PUT for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(caseData),
        })
            .then(response => response.json())
            .then(() => {
                navigate('/'); // Navigate back to the home page or dashboard
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h1>Update Missing Case</h1>
            <form onSubmit={handleSubmit}>
                {/* Form fields here, example: */}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={caseData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={caseData.age || ''}
                        onChange={handleChange}
                        placeholder="Age"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Last Seen Date</label>
                    <input
                        type="date"
                        name="lastSeenDate"
                        value={caseData.lastSeenDate}
                        onChange={handleChange}
                        placeholder="Last Seen Date"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastSeenLocation">Last seen location</label>
                    <input
                        type="text"
                        name="lastSeenLocation"
                        value={caseData.lastSeenLocation || ''}
                        onChange={handleChange}
                        placeholder="Last Seen Location"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        value={caseData.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reportedDate">Reported Date</label>
                    <input
                        type="date"
                        name="reportedDate"
                        value={caseData.reportedDate}
                        onChange={handleChange}
                        placeholder="Reported Date"
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;
