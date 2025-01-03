"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Correct import
class Service extends sequelize_1.Model {
    id;
    userId;
    name;
    description;
    price;
    image; // Add image property to your model
}
Service.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    price: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    image: { type: sequelize_1.DataTypes.STRING }, // Make sure this matches your DB schema
}, {
    sequelize: database_1.sequelize,
    modelName: 'Service',
});
exports.default = Service;
