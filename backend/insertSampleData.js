// backend/insertSampleData.js
const sequelize = require('./config/database'); // Adjust the path to your database config
const MissingCase = require('./models/MissingCase'); // Adjust the path to your model

const insertSampleData = async () => {
    await sequelize.sync({ force: true }); // This will drop the table if it exists and create a new one
    await MissingCase.bulkCreate([
        {
            name: 'John Doe',
            age: 35,
            lastSeenDate: '2024-01-01',
            lastSeenLocation: 'City Center',
            description: 'Wearing a blue jacket and jeans',
            reportedDate: '2024-01-02'
        },
        {
            name: 'Jane Smith',
            age: 28,
            lastSeenDate: '2024-01-05',
            lastSeenLocation: 'Mall',
            description: 'Carrying a red handbag',
            reportedDate: '2024-01-06'
        }
    ]);
    console.log('Sample data inserted successfully');
    process.exit();
};

insertSampleData().catch(error => {
    console.error('Error inserting sample data:', error);
    process.exit(1);
});

