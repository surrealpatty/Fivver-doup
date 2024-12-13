"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Correctly import the sequelize instance
// Define the Service model class
class Service extends sequelize_1.Model {
}
// Initialize the Service model with the sequelize instance
Service.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true, // Mark as the primary key
        autoIncrement: true, // Automatically increment the value
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Name must be provided
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Description must be provided
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false, // Price must be provided
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // User ID must be provided
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Allow null for the image field
    },
}, {
    sequelize: database_1.sequelize, // Pass the sequelize instance here
    modelName: 'Service', // Model name to be used in database
    tableName: 'services', // Optionally specify table name (default is the plural form of model name)
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
});
// Export the Service model
exports.default = Service;
//# sourceMappingURL=services.js.map