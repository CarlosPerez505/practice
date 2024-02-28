import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({ id }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        // Confirm deletion
        if (window.confirm('Are you sure you want to delete this case?')) {
            fetch(`/api/missingCases/${id}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    navigate('/'); // Navigate back to the home page or dashboard
                })
                .catch(error => console.error('Error:', error));
        }
    };

    return <button onClick={handleDelete}>Delete Case</button>;
};

export default DeleteButton;
