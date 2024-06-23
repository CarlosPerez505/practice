import { pool } from '../config/db.js';

const sampleData = [
    {
        name: 'John Doe',
        age: 30,
        lastSeenDate: '2023-01-01',
        lastSeenLocation: 'New York',
        description: 'Missing since January',
        reportedDate: '2023-01-02',
        eyeColor: 'Blue',
        sex: 'Male',
        firstName: 'John',
        hairColor: 'Blonde',
        height: '180cm',
        tattoos: 'None',
        hobbiesAndInterests: 'Reading',
        identifyingMarks: 'Scar on left cheek',
        lastName: 'Doe',
        lastLatitude: 40.7128,
        lastLongitude: -74.0060,
        photo1: 'path/to/photo1.jpg',
        tribe: 'None',
        weight: '80',
        lastKnownAddress: '123 Main St, New York, NY',
        lastPlaceOfEmployment: 'ABC Corp',
        school: 'XYZ University',
        temp_dateOfBirth: '1993-01-01',
        dateOfBirth: '1993-01-01',
        latitude: 40.7128,
        longitude: -74.0060,
    },
    // Add more sample data if needed
];

const insertSampleData = async () => {
    for (const data of sampleData) {
        const query = `
            INSERT INTO missingCases 
            (name, age, lastSeenDate, lastSeenLocation, description, reportedDate, eyeColor, sex, firstName, hairColor, height, tattoos, hobbiesAndInterests, identifyingMarks, lastName, lastLatitude, lastLongitude, photo1, tribe, weight, lastKnownAddress, lastPlaceOfEmployment, school, temp_dateOfBirth, dateOfBirth, latitude, longitude)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.name,
            data.age,
            data.lastSeenDate,
            data.lastSeenLocation,
            data.description,
            data.reportedDate,
            data.eyeColor,
            data.sex,
            data.firstName,
            data.hairColor,
            data.height,
            data.tattoos,
            data.hobbiesAndInterests,
            data.identifyingMarks,
            data.lastName,
            data.lastLatitude,
            data.lastLongitude,
            data.photo1,
            data.tribe,
            data.weight,
            data.lastKnownAddress,
            data.lastPlaceOfEmployment,
            data.school,
            data.temp_dateOfBirth,
            data.dateOfBirth,
            data.latitude,
            data.longitude,
        ];
        try {
            const [result] = await pool.query(query, values);
            console.log('Inserted row with id:', result.insertId);
        } catch (err) {
            console.error('Error inserting data:', err);
        }
    }
};

insertSampleData()
    .then(() => console.log('Sample data inserted'))
    .catch(err => console.error('Error inserting sample data:', err));
