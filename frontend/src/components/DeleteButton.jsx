import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({ id }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this case?')) {
            fetch(`http://10.0.0.163:5000/api/missingCases/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if (!data.error) {
                        navigate('/'); // Navigate back to the home page or dashboard if delete is successful
                    } else {
                        alert('Error: ' + data.error);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to delete the case.');
                });
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
            Delete Case
        </button>
    );
};

export default DeleteButton;
