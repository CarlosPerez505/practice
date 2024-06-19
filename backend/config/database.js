// backend/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', 'mssql'
});

module.exports = sequelize;
