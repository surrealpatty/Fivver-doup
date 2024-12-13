"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/services.ts
const sequelize_1 = require("sequelize");
const database_1 = require("@config/database"); // Ensure the sequelize import is correct
// Define the Service model class
class Service extends sequelize_1.Model {
}
// Initialize the Service model
Service.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING, // Change to STRING to match userId as string (UUID)
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize, // Sequelize instance
    tableName: 'services',
});
// Export the model and interface
exports.default = Service; // Default export
//# sourceMappingURL=services.js.map