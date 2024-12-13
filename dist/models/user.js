"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("config/database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
    email: { type: sequelize_1.DataTypes.STRING },
    username: { type: sequelize_1.DataTypes.STRING },
    password: { type: sequelize_1.DataTypes.STRING },
    isVerified: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    role: { type: sequelize_1.DataTypes.STRING },
    tier: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 1 },
    resetToken: { type: sequelize_1.DataTypes.STRING, allowNull: true }, // Add resetToken field
    resetTokenExpiration: { type: sequelize_1.DataTypes.DATE, allowNull: true }, // Add resetTokenExpiration field
}, { sequelize: database_1.sequelize, modelName: 'User' });
//# sourceMappingURL=user.js.map