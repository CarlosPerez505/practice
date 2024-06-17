import React, { useState, useEffect } from 'react';
import './CreateMissingCase.css';
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
        <div>
            <div>
                <form className="bg-slate-800 p-10" onSubmit={handleSubmit}>
                    <h1>Create Missing Case</h1>
                    {showSuccessMessage && <div className="success-message">Case created successfully!</div>}
                    {showErrorMessage && <div className="error-message">Error creating missing case. Please try again.</div>}
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
                        <label htmlFor="lastSeenDate">Last Seen Date</label>
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
                    <div className="form-group">
                        <label htmlFor="eyeColor">Eye Color</label>
                        <input
                            type="text"
                            name="eyeColor"
                            value={formData.eyeColor}
                            onChange={handleChange}
                            placeholder="Eye Color"
                        />
                        {formErrors.eyeColor && <div className="error-message">{formErrors.eyeColor}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="sex">Sex</label>
                        <input
                            type="text"
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            placeholder="Sex"
                        />
                        {formErrors.sex && <div className="error-message">{formErrors.sex}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="hairColor">Hair Color</label>
                        <input
                            type="text"
                            name="hairColor"
                            value={formData.hairColor}
                            onChange={handleChange}
                            placeholder="Hair Color"
                        />
                        {formErrors.hairColor && <div className="error-message">{formErrors.hairColor}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="height">Height</label>
                        <input
                            type="text"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            placeholder="Height"
                        />
                        {formErrors.height && <div className="error-message">{formErrors.height}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="tattoos">Tattoos</label>
                        <input
                            type="text"
                            name="tattoos"
                            value={formData.tattoos}
                            onChange={handleChange}
                            placeholder="Tattoos"
                        />
                        {formErrors.tattoos && <div className="error-message">{formErrors.tattoos}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="identifyingMarks">Identifying Marks</label>
                        <input
                            type="text"
                            name="identifyingMarks"
                            value={formData.identifyingMarks}
                            onChange={handleChange}
                            placeholder="Identifying Marks"
                        />
                        {formErrors.identifyingMarks && <div className="error-message">{formErrors.identifyingMarks}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastLatitude">Last Latitude</label>
                        <input
                            type="text"
                            name="lastLatitude"
                            value={formData.lastLatitude}
                            onChange={handleChange}
                            placeholder="Last Latitude"
                        />
                        {formErrors.lastLatitude && <div className="error-message">{formErrors.lastLatitude}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastLongitude">Last Longitude</label>
                        <input
                            type="text"
                            name="lastLongitude"
                            value={formData.lastLongitude}
                            onChange={handleChange}
                            placeholder="Last Longitude"
                        />
                        {formErrors.lastLongitude && <div className="error-message">{formErrors.lastLongitude}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo1">Photo</label>
                        <input
                            type="text"
                            name="photo1"
                            value={formData.photo1}
                            onChange={handleChange}
                            placeholder="Photo"
                        />
                        {formErrors.photo1 && <div className="error-message">{formErrors.photo1}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="tribe">Tribe</label>
                        <input
                            type="text"
                            name="tribe"
                            value={formData.tribe}
                            onChange={handleChange}
                            placeholder="Tribe"
                        />
                        {formErrors.tribe && <div className="error-message">{formErrors.tribe}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight">Weight</label>
                        <input
                            type="text"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            placeholder="Weight"
                        />
                        {formErrors.weight && <div className="error-message">{formErrors.weight}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastKnownAddress">Last Known Address</label>
                        <input
                            type="text"
                            name="lastKnownAddress"
                            value={formData.lastKnownAddress}
                            onChange={handleChange}
                            placeholder="Last Known Address"
                        />
                        {formErrors.lastKnownAddress && <div className="error-message">{formErrors.lastKnownAddress}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastPlaceOfEmployment">Last Place Of Employment</label>
                        <input
                            type="text"
                            name="lastPlaceOfEmployment"
                            value={formData.lastPlaceOfEmployment}
                            onChange={handleChange}
                            placeholder="Last Place Of Employment"
                        />
                        {formErrors.lastPlaceOfEmployment && <div className="error-message">{formErrors.lastPlaceOfEmployment}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="school">School</label>
                        <input
                            type="text"
                            name="school"
                            value={formData.school}
                            onChange={handleChange}
                            placeholder="School Name"
                        />
                        {formErrors.school && <div className="error-message">{formErrors.school}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date Of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            placeholder="Date Of Birth"
                        />
                        {formErrors.dateOfBirth && <div className="error-message">{formErrors.dateOfBirth}</div>}
                    </div>
                    <button className="bg-primary text-white p-2 rounded mt-5" type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}

export default CreateMissingCase;



