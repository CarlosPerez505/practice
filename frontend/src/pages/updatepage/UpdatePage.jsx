// src/pages/UpdatePage.jsx
import React, { useState } from 'react';

function UpdatePage() {
    const [formData, setFormData] = useState({
        id: '', // Assuming you're updating by ID
        name: '',
        lastSeenDate: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
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
                // Handle success, maybe clear the form or show a success message
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors, possibly show an error message to the user
            });
    };

    return (
        <div>
            <h1>Update Missing Case</h1>
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
        </div>
    );
}

export default UpdatePage;
