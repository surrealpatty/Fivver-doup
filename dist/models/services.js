"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/services.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Service extends sequelize_1.Model {
}
Service.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true, // Mark as the primary key
        autoIncrement: true, // Automatically increment the value
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Allow null for the image field
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Service',
});
exports.default = Service;
//# sourceMappingURL=services.js.map