"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Ensure the path to your sequelize instance is correct
// Define the Service model class with TypeScript types
class Service extends sequelize_1.Model {
    // Define associations for Service (optional if associations are used)
    static associate(models) {
        // Example association: A service can have many orders
        Service.hasMany(models.Order, { foreignKey: 'serviceId', as: 'orders' });
        // Add more associations as needed
    }
}
// Initialize the Service model
Service.init({
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 100], // Enforce length between 3 and 100 characters
                msg: 'Title must be between 3 and 100 characters long',
            },
        },
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Description cannot be empty', // Ensure description is provided
            },
        },
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: {
                msg: 'Price must be a valid number', // Validate price as a float
            },
            min: {
                args: [0],
                msg: 'Price must be greater than or equal to zero', // Ensure price is non-negative
            },
        },
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Category cannot be empty', // Ensure category is provided
            },
        },
    },
}, {
    sequelize: database_1.sequelize, // Pass sequelize instance here
    modelName: 'Service', // Use the name 'Service'
    tableName: 'services', // Table name in the database
    timestamps: true, // Automatically add createdAt and updatedAt columns
    underscored: true, // Use snake_case for database column names
});
exports.default = Service;
//# sourceMappingURL=services.js.map