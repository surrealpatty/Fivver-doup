"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/services.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database")); // Ensure named import from your config
// Define the Service model class
class Service extends sequelize_1.Model {
    id;
    name;
}
// Initialize the model
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
    // Add more fields as necessary
}, {
    sequelize: database_1.default, // Pass the sequelize instance
    modelName: 'Service', // Specify the model name
    tableName: 'services', // Optional, specify table name if needed
    timestamps: true, // Optional, set to false if you don't want timestamps
});
exports.default = Service;
//# sourceMappingURL=services.js.map