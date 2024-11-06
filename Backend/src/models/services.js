import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Import sequelize instance

class Service extends Model {}

// Initialize the Service model
Service.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 100],  // Title length between 3 and 100 characters
                    msg: 'Title must be between 3 and 100 characters long',
                },
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Description cannot be empty',  // Ensure description is not empty
                },
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: {
                    msg: 'Price must be a valid number',  // Validate price as a float
                },
                min: {
                    args: [0],
                    msg: 'Price must be greater than or equal to zero',  // Ensure non-negative price
                },
            },
        },
    },
    {
        sequelize,           // Ensure sequelize instance is passed here
        modelName: 'Service', // Model name should be 'Service'
        tableName: 'services', // Table name in the database
        timestamps: true,     // Automatically create 'createdAt' and 'updatedAt'
        underscored: true,    // Use snake_case in the table column names
    }
);

export default Service;  // Export the model directly
