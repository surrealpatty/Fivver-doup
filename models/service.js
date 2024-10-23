// models/service.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your database configuration

class Service extends Model {}

Service.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // This should match the name of the users table
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Service',
        tableName: 'services', // Specify the table name in the database
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Define associations if needed
Service.associate = (models) => {
    Service.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user', // Alias for the association
    });
};

module.exports = Service;
