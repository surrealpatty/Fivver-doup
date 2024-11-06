// src/models/services.js

import { Model, DataTypes } from 'sequelize';

// Define the Service class
class Service extends Model {
    static associate(models) {
        // Define associations if needed
        // Example: Service.hasMany(models.Review, { foreignKey: 'serviceId', as: 'reviews' });
    }
}

// Initialize the Service model
const initService = (sequelize) => {
    Service.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [3, 100],
                        msg: 'Title must be between 3 and 100 characters long',
                    },
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Description cannot be empty',
                    },
                },
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: {
                        msg: 'Price must be a valid number',
                    },
                    min: {
                        args: [0],
                        msg: 'Price must be greater than or equal to zero',
                    },
                },
            },
        },
        {
            sequelize, // Pass the Sequelize instance here
            modelName: 'Service',
            tableName: 'services', // This is the name of the table
            timestamps: true, // Enable timestamps (createdAt, updatedAt)
            underscored: true, // Use snake_case for column names
        }
    );

    return Service; // Return the model after initialization
};

export { initService };
