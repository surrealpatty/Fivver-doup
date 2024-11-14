"use strict";
// src/models/user.ts
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Free',
    },
    subscriptionStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Inactive',
    },
    subscriptionStartDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    subscriptionEndDate: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
});
exports.default = User;
//# sourceMappingURL=user.js.map