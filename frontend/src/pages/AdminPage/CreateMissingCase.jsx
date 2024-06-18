import React, { useState, useEffect } from 'react';
import SearchCases from "../../components/SearchCases/SearchCases.jsx";

function CreateMissingCase() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        age: '',
        lastSeenDate: '',
        lastSeenLocation: '',
        description: '',
        reportedDate: '',
        eyeColor: '',
        sex: '',
        hairColor: '',
        height: '',
        tattoos: '',
        identifyingMarks: '',
        lastLatitude: '',
        lastLongitude: '',
        photo1: '',
        weight: '',
        lastKnownAddress: '',
        lastPlaceOfEmployment: '',
        school: '',
        dateOfBirth: '',
    });

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [cases, setCases] = useState([]);

    useEffect(() => {
        fetchCases();
    }, []);

    const fetchCases = () => {
        fetch('http://10.0.0.163:5000/api/missingCases')
            .then(response => response.json())
            .then(data => setCases(data))
            .catch(error => console.error('Error fetching cases:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validateFormData(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setShowErrorMessage(true);
            setShowSuccessMessage(false);
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        };

        fetch('http://10.0.0.163:5000/api/missingCases', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setShowSuccessMessage(true);
                setShowErrorMessage(false);
                setFormData({
                    id: '',
                    name: '',
                    age: '',
                    lastSeenDate: '',
                    lastSeenLocation: '',
                    description: '',
                    reportedDate: '',
                    eyeColor: '',
                    sex: '',
                    hairColor: '',
                    height: '',
                    tattoos: '',
                    identifyingMarks: '',
                    lastLatitude: '',
                    lastLongitude: '',
                    photo1: '',
                    weight: '',
                    lastKnownAddress: '',
                    lastPlaceOfEmployment: '',
                    school: '',
                    dateOfBirth: '',
                });
                setFormErrors({});
            })
            .catch((error) => {
                console.error('Error:', error);
                setShowErrorMessage(true);
                setShowSuccessMessage(false);
            });
    };

    const validateFormData = (data) => {
        let errors = {};

        if (!data.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!data.age) {
            errors.age = 'Age is required';
        } else if (isNaN(data.age) || data.age < 0 || data.age > 120) {
            errors.age = 'Age must be a number between 0 and 120';
        }

        if (data.lastSeenDate && isNaN(Date.parse(data.lastSeenDate))) {
            errors.lastSeenDate = 'Invalid date format';
        }

        if (!data.lastSeenLocation.trim()) {
            errors.lastSeenLocation = 'Last seen location is required';
        }

        if (!data.reportedDate.trim()) {
            errors.reportedDate = 'Reported date is required';
        }

        if (!data.sex.trim()) {
            errors.sex = 'Sex is required';
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        if (formErrors[name]) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                [name]: undefined,
            }));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <form className="bg-slate-800 p-10 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold text-white mb-4">Create Missing Case</h1>
                {showSuccessMessage && <div className="success-message text-green-500 mb-4">Case created successfully!</div>}
                {showErrorMessage && <div className="error-message text-red-500 mb-4">Error creating missing case. Please try again.</div>}
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="name">Name</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    {formErrors.name && <div className="text-red-500 mt-1">{formErrors.name}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="age">Age</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="number"
                        name="age"
                        value={formData.age || ''}
                        onChange={handleChange}
                        placeholder="Age"
                    />
                    {formErrors.age && <div className="text-red-500 mt-1">{formErrors.age}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="lastSeenDate">Last Seen Date</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="date"
                        name="lastSeenDate"
                        value={formData.lastSeenDate}
                        onChange={handleChange}
                        placeholder="Last Seen Date"
                    />
                    {formErrors.lastSeenDate && <div className="text-red-500 mt-1">{formErrors.lastSeenDate}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="lastSeenLocation">Last seen location</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="lastSeenLocation"
                        value={formData.lastSeenLocation || ''}
                        onChange={handleChange}
                        placeholder="Last Seen Location"
                    />
                    {formErrors.lastSeenLocation && <div className="text-red-500 mt-1">{formErrors.lastSeenLocation}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="description">Description</label>
                    <textarea
                        className="w-full p-2 rounded border"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />
                    {formErrors.description && <div className="text-red-500 mt-1">{formErrors.description}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="reportedDate">Reported Date</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="date"
                        name="reportedDate"
                        value={formData.reportedDate}
                        onChange={handleChange}
                        placeholder="Reported Date"
                    />
                    {formErrors.reportedDate && <div className="text-red-500 mt-1">{formErrors.reportedDate}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="eyeColor">Eye Color</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="eyeColor"
                        value={formData.eyeColor}
                        onChange={handleChange}
                        placeholder="Eye Color"
                    />
                    {formErrors.eyeColor && <div className="text-red-500 mt-1">{formErrors.eyeColor}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="sex">Sex</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        placeholder="Sex"
                    />
                    {formErrors.sex && <div className="text-red-500 mt-1">{formErrors.sex}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="hairColor">Hair Color</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="hairColor"
                        value={formData.hairColor}
                        onChange={handleChange}
                        placeholder="Hair Color"
                    />
                    {formErrors.hairColor && <div className="text-red-500 mt-1">{formErrors.hairColor}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="height">Height</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder="Height"
                    />
                    {formErrors.height && <div className="text-red-500 mt-1">{formErrors.height}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="tattoos">Tattoos</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="tattoos"
                        value={formData.tattoos}
                        onChange={handleChange}
                        placeholder="Tattoos"
                    />
                    {formErrors.tattoos && <div className="text-red-500 mt-1">{formErrors.tattoos}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="identifyingMarks">Identifying Marks</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="identifyingMarks"
                        value={formData.identifyingMarks}
                        onChange={handleChange}
                        placeholder="Identifying Marks"
                    />
                    {formErrors.identifyingMarks && <div className="text-red-500 mt-1">{formErrors.identifyingMarks}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="lastLatitude">Last Latitude</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="lastLatitude"
                        value={formData.lastLatitude}
                        onChange={handleChange}
                        placeholder="Last Latitude"
                    />
                    {formErrors.lastLatitude && <div className="text-red-500 mt-1">{formErrors.lastLatitude}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="lastLongitude">Last Longitude</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="lastLongitude"
                        value={formData.lastLongitude}
                        onChange={handleChange}
                        placeholder="Last Longitude"
                    />
                    {formErrors.lastLongitude && <div className="text-red-500 mt-1">{formErrors.lastLongitude}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="photo1">Photo</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="photo1"
                        value={formData.photo1}
                        onChange={handleChange}
                        placeholder="Photo"
                    />
                    {formErrors.photo1 && <div className="text-red-500 mt-1">{formErrors.photo1}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="tribe">Tribe</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="tribe"
                        value={formData.tribe}
                        onChange={handleChange}
                        placeholder="Tribe"
                    />
                    {formErrors.tribe && <div className="text-red-500 mt-1">{formErrors.tribe}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="weight">Weight</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="Weight"
                    />
                    {formErrors.weight && <div className="text-red-500 mt-1">{formErrors.weight}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="lastKnownAddress">Last Known Address</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="lastKnownAddress"
                        value={formData.lastKnownAddress}
                        onChange={handleChange}
                        placeholder="Last Known Address"
                    />
                    {formErrors.lastKnownAddress && <div className="text-red-500 mt-1">{formErrors.lastKnownAddress}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="lastPlaceOfEmployment">Last Place Of Employment</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="lastPlaceOfEmployment"
                        value={formData.lastPlaceOfEmployment}
                        onChange={handleChange}
                        placeholder="Last Place Of Employment"
                    />
                    {formErrors.lastPlaceOfEmployment && <div className="text-red-500 mt-1">{formErrors.lastPlaceOfEmployment}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="school">School</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        placeholder="School Name"
                    />
                    {formErrors.school && <div className="text-red-500 mt-1">{formErrors.school}</div>}
                </div>
                <div className="form-group mb-4">
                    <label className="block text-white" htmlFor="dateOfBirth">Date Of Birth</label>
                    <input
                        className="w-full p-2 rounded border"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        placeholder="Date Of Birth"
                    />
                    {formErrors.dateOfBirth && <div className="text-red-500 mt-1">{formErrors.dateOfBirth}</div>}
                </div>
                <button className="bg-blue-500 text-white p-2 rounded mt-5" type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateMissingCase;




