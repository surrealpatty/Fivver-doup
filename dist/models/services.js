"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Import the sequelize instance
class Service extends sequelize_1.Model {
}
Service.init({
    id: {
        type: sequelize_1.DataTypes.STRING, // Using string type to align with UUID format
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4, // Use UUIDv4 for auto-generated ids
    },
    userId: {
        type: sequelize_1.DataTypes.STRING, // Ensure userId type is a string to match the User model's id type
        allowNull: false,
        references: {
            model: 'Users', // Foreign key reference to the Users table
            key: 'id', // Linking to the 'id' column of the Users table
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Ensure the service name is required
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Ensure the service description is required
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false, // Ensure the service price is required
    },
    image: {
        type: sequelize_1.DataTypes.STRING, // Optional field for the service image
        allowNull: true, // Allow image to be null (if not provided)
    },
}, {
    sequelize: database_1.sequelize, // The sequelize instance
    modelName: 'Service', // Model name 'Service'
    tableName: 'Services', // Table name in the database
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    underscored: true, // Use snake_case column names in the database
});
exports.default = Service;
//# sourceMappingURL=services.js.map