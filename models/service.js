const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure the path is correct

class Service extends Model {}

// Initialize the Service model
Service.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Adjust this to match your actual user table name
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Service',
    tableName: 'services', // Optionally set a custom table name
    timestamps: true, // Enable timestamps if you want createdAt and updatedAt fields
});

module.exports = Service; // Ensure this line is present
