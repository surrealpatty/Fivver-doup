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
        sequelize,           // Ensure the sequelize instance is passed here
        modelName: 'Service',
        tableName: 'services',
        timestamps: true,
        underscored: true,
    }
);

export default Service;  // Export the model directly
