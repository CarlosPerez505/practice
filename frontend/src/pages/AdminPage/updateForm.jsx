import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateForm = () => {
    const [caseData, setCaseData] = useState({ name: '', age: '', lastSeenDate: '', lastSeenLocation: '', description: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch case data to pre-populate the form
        fetch(`/api/cases/${id}`)
            .then(response => response.json())
            .then(data => setCaseData(data));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // API call to update the case
        fetch(`/api/admin/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...caseData, id }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                navigate('/'); // Navigate back to the home page or dashboard
            })
            .catch(error => console.error('Error:', error));
    };

    // Form with inputs for name, age, etc., and a submit button
    // Use caseData to pre-populate fields
};

export default UpdateForm;
