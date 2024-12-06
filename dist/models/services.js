"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database")); // Import the sequelize instance from config
// Sequelize Service model class
class Service extends sequelize_1.Model {
    id;
    title;
    description;
    price;
    userId;
}
// Initialize the Service model using Sequelize's `init` method
Service.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Ensure the title is not null
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false, // Ensure the description is not null
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false, // Ensure price is not null
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false, // Ensure userId is not null
    },
}, {
    sequelize: database_1.default, // Pass the Sequelize instance to initialize the model
    modelName: 'Service', // The name of the model in the database
    tableName: 'services', // The name of the table in the database
    timestamps: true, // Enable timestamps if you want createdAt and updatedAt fields
});
exports.default = Service; // Export the Service model as the default export
//# sourceMappingURL=services.js.map