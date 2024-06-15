import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UpdateForm = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        age: '',
        lastSeenDate: '',
        lastSeenLocation: '',
        description: '',
        reportedDate: '',
        eyeColor: '',
        sex: '',
        lastLatitude:'',
        lastLongitude:'',
        photo1:'',
        tribe: '',
        weight:'',
        lastKnownAddress: '',
        lastPlaceOfEmployment:'',
        school:'',
        dateOfBirth:'',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetch(`http://10.0.0.163:5000/api/missingCases/${id}`)
                .then(response => response.json())
                .then(data => {
                    const formattedData = {
                        ...data,
                        lastSeenDate: formatDate(data.lastSeenDate),
                        reportedDate: formatDate(data.reportedDate),
                    };
                    setInitialValues(formattedData);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [id]);

    // Helper function to format date for input[type=date]
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().nullable(),
        age: Yup.number().positive('Age must be positive').nullable(),
        lastSeenDate: Yup.date().nullable(),
        lastSeenLocation: Yup.string().nullable(),
        description: Yup.string().nullable(),
        reportedDate: Yup.date().nullable(),
        eyeColor: Yup.string().nullable(),
        sex: Yup.string().nullable(),
        firstName: Yup.string().nullable(),
        hairColor: Yup.string().nullable(),
        height: Yup.string().nullable(),
        tattoos: Yup.string().nullable(),
        hobbiesAndInterests: Yup.string().nullable(),
        identifyingMarks: Yup.string().nullable(),
        lastName: Yup.string().nullable(),
        lastLatitude: Yup.number().nullable(),
        lastLongitude: Yup.number().nullable(),
        photo1: Yup.string().nullable(),
        tribe: Yup.string().nullable(),
        weight: Yup.number().positive('Weight must be positive').nullable(),
        lastKnownAddress: Yup.string().nullable(),
        lastPlaceOfEmployment: Yup.string().nullable(),
        school: Yup.string().nullable(),
        temp_dateOfBirth: Yup.date().nullable(),
        dateOfBirth: Yup.date().nullable(),
    });


    return (
        <div >
            <h1>Update Missing Case</h1>
            <Formik
                enableReinitialize // Important: This allows Formik to reinitialize with new initial values
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    // Remove null or empty fields
                    const filteredValues = Object.keys(values).reduce((acc, key) => {
                        if (values[key] !== '' && values[key] !== null && values[key] !== undefined) {
                            acc[key] = values[key];
                        }
                        return acc;
                    }, {});

                    fetch(`http://10.0.0.163:5000/api/missingCases/${id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(filteredValues),
                    })
                        .then(response => response.json())
                        .then(() => navigate('/'))
                        .catch(error => console.error('Error:', error))
                        .finally(() => setSubmitting(false));
                }}

            >
                {({ isSubmitting }) => (
                    <Form className="bg-slate-800 p-10 space-y-6">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Field type="text" name="name" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="name" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <Field type="number" name="age" />
                            <ErrorMessage name="age" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastSeenDate">Last Seen Date</label>
                            <Field type="date" name="lastSeenDate" />
                            <ErrorMessage name="lastSeenDate" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastSeenLocation">Last Seen Location</label>
                            <Field type="text" name="lastSeenLocation" />
                            <ErrorMessage name="lastSeenLocation" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Field type="text" name="description" />
                            <ErrorMessage name="description" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reportedDate">Reported Date</label>
                            <Field type="date" name="reportedDate" />
                            <ErrorMessage name="reportedDate" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="eyeColor">Eye Color</label>
                            <Field type="text" name="eyeColor" />
                            <ErrorMessage name="eyeColor" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sex">sex</label>
                            <Field type="text" name="sex" />
                            <ErrorMessage name="sex" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hairColor">Hair Color</label>
                            <Field type="text" name="hairColor" />
                            <ErrorMessage name="hairColor" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="height">Height</label>
                            <Field type="text" name="height" />
                            <ErrorMessage name="height" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tattoos">Tattoos</label>
                            <Field type="text" name="tattoos" />
                            <ErrorMessage name="tattoos" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="identifyingMarks">Identifying Marks </label>
                            <Field type="text" name="identifyingMarks" />
                            <ErrorMessage name="identifyingMarks" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastLatitude">Last Latitude</label>
                            <Field type="text" name="lastLatitude" />
                            <ErrorMessage name="lastLatitude" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastLongitutde">Last Longitude</label>
                            <Field type="text" name="lastLongitude" />
                            <ErrorMessage name="lastLongitutde" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="photo1">Photo</label>
                            <Field type="text" name="photo1" />
                            <ErrorMessage name="photo1" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tribe">Tribe</label>
                            <Field type="text" name="tribe" />
                            <ErrorMessage name="tribe" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="weight">Weight</label>
                            <Field type="text" name="weight" />
                            <ErrorMessage name="weight" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastPlaceOfEmployment">Last Place Of Employment</label>
                            <Field type="text" name="lastPlaceOfEmployment" />
                            <ErrorMessage name="lastPlaceOfEmployment" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="school">School</label>
                            <Field type="text" name="school" />
                            <ErrorMessage name="school" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date Of Birth </label>
                            <Field type="text" name="dateOfBirth" />
                            <ErrorMessage name="dateOfBirth" component="div" />
                        </div>
                        {/* Repeat for other fields */}
                        <button type="submit" disabled={isSubmitting}>
                            Update
                        </button>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateForm;