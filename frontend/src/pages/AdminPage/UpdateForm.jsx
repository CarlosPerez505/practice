import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import DeleteButton from '../../components/DeleteButton.jsx';

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
        lastLatitude: '',
        lastLongitude: '',
        photo1: '',
        tribe: '',
        weight: '',
        lastKnownAddress: '',
        lastPlaceOfEmployment: '',
        school: '',
        dateOfBirth: '',
        temp_dateOfBirth: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://10.0.0.163:5000/api/missingCases/${id}`)
                .then(response => {
                    const data = response.data;
                    const formattedData = {
                        ...data,
                        lastSeenDate: formatDate(data.lastSeenDate),
                        reportedDate: formatDate(data.reportedDate),
                        dateOfBirth: formatDate(data.dateOfBirth),
                    };
                    setInitialValues(formattedData);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().nullable(),
        age: Yup.number().positive('Age must be positive').nullable(),
        lastSeenDate: Yup.date().nullable(),
        lastSeenLocation: Yup.string().nullable(),
        description: Yup.string().nullable(),
        reportedDate: Yup.date().nullable(),
        eyeColor: Yup.string().nullable(),
        sex: Yup.string().nullable(),
        lastLatitude: Yup.number().nullable(),
        lastLongitude: Yup.number().nullable(),
        photo1: Yup.string().nullable(),
        tribe: Yup.string().nullable(),
        weight: Yup.number().positive('Weight must be positive').nullable(),
        lastKnownAddress: Yup.string().nullable(),
        lastPlaceOfEmployment: Yup.string().nullable(),
        school: Yup.string().nullable(),
        dateOfBirth: Yup.date().nullable(),
        temp_dateOfBirth: Yup.date().nullable(),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        const formattedValues = {
            ...values,
            lastSeenDate: values.lastSeenDate || null,
            reportedDate: values.reportedDate || null,
            dateOfBirth: values.dateOfBirth || null,
            temp_dateOfBirth: values.temp_dateOfBirth || null
        };

        axios.patch(`http://10.0.0.163:5000/api/missingCases/${id}`, formattedValues)
            .then(() => navigate('/'))
            .catch(error => console.error('Error:', error))
            .finally(() => setSubmitting(false));
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-slate-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Update Missing Case</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        <div className="form-group">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <Field type="text" name="name" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                            <Field type="number" name="age" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastSeenDate" className="block text-sm font-medium text-gray-700">Last Seen Date</label>
                            <Field type="date" name="lastSeenDate" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="lastSeenDate" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastSeenLocation" className="block text-sm font-medium text-gray-700">Last Seen Location</label>
                            <Field type="text" name="lastSeenLocation" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="lastSeenLocation" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <Field type="text" name="description" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="reportedDate" className="block text-sm font-medium text-gray-700">Reported Date</label>
                            <Field type="date" name="reportedDate" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="reportedDate" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="eyeColor" className="block text-sm font-medium text-gray-700">Eye Color</label>
                            <Field type="text" name="eyeColor" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="eyeColor" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex</label>
                            <Field type="text" name="sex" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="sex" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="hairColor" className="block text-sm font-medium text-gray-700">Hair Color</label>
                            <Field type="text" name="hairColor" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="hairColor" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
                            <Field type="text" name="height" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="height" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tattoos" className="block text-sm font-medium text-gray-700">Tattoos</label>
                            <Field type="text" name="tattoos" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="tattoos" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="identifyingMarks" className="block text-sm font-medium text-gray-700">Identifying Marks</label>
                            <Field type="text" name="identifyingMarks" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="identifyingMarks" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastLatitude" className="block text-sm font-medium text-gray-700">Last Latitude</label>
                            <Field type="text" name="lastLatitude" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="lastLatitude" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastLongitude" className="block text-sm font-medium text-gray-700">Last Longitude</label>
                            <Field type="text" name="lastLongitude" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="lastLongitude" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="photo1" className="block text-sm font-medium text-gray-700">Photo URL</label>
                            <Field type="text" name="photo1" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="photo1" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tribe" className="block text-sm font-medium text-gray-700">Tribe</label>
                            <Field type="text" name="tribe" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="tribe" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
                            <Field type="text" name="weight" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="weight" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastPlaceOfEmployment" className="block text-sm font-medium text-gray-700">Last Place Of Employment</label>
                            <Field type="text" name="lastPlaceOfEmployment" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="lastPlaceOfEmployment" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="school" className="block text-sm font-medium text-gray-700">School</label>
                            <Field type="text" name="school" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="school" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date Of Birth</label>
                            <Field type="date" name="dateOfBirth" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="temp_dateOfBirth" className="block text-sm font-medium text-gray-700">Temporary Date Of Birth</label>
                            <Field type="date" name="temp_dateOfBirth" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="temp_dateOfBirth" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastKnownAddress" className="block text-sm font-medium text-gray-700">Last Known Address</label>
                            <Field type="text" name="lastKnownAddress" className="p-3 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <ErrorMessage name="lastKnownAddress" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>
                        <div className="form-group flex justify-between items-center">
                            <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Update
                            </button>
                            <DeleteButton id={id} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateForm;
