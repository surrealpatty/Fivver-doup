"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
// src/models/service.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Correct the path if needed
class Service extends sequelize_1.Model {
}
exports.Service = Service;
Service.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
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
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Service',
});
exports.default = Service; // Ensure Service is exported properly
//# sourceMappingURL=service.js.map