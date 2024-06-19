// backend/models/MissingCase.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database config

const MissingCase = sequelize.define('MissingCase', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lastSeenDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    lastSeenLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    reportedDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = MissingCase;
