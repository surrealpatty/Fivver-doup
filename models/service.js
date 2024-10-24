const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure this path is correct

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
    },
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'Service', // This defines the name of the model
    tableName: 'services', // Optional: specify the table name if not following the naming convention
    timestamps: true, // Optional: automatically add createdAt and updatedAt fields
});

// Export the Service model
module.exports = Service;
