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
        reportedDate: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/missingCases/${id}`)
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
        name: Yup.string().required('Name is required'),
        age: Yup.number().required('Age is required').positive('Age must be positive'),
        lastSeenDate: Yup.date(),
        lastSeenLocation: Yup.string(),
        description: Yup.string(),
        reportedDate: Yup.date(),
    });

    return (
        <div>
            <h1>Update Missing Case</h1>
            <Formik
                enableReinitialize // Important: This allows Formik to reinitialize with new initial values
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    fetch(`http://localhost:5000/api/missingCases/${id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values),
                    })
                        .then(response => response.json())
                        .then(() => navigate('/'))
                        .catch(error => console.error('Error:', error))
                        .finally(() => setSubmitting(false));
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Field type="text" name="name" />
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
                            <Field type="text" name="lastLongitutde" />
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