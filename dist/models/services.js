"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/service.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Service extends sequelize_1.Model {
}
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
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true,
    underscored: true,
});
exports.default = Service;
//# sourceMappingURL=services.js.map