"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class User extends sequelize_1.Model {
}
exports.User = User;
// Initialize the User model
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        // Removed unique: true to avoid duplicate index
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'user',
    },
    tier: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'free',
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    resetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    resetTokenExpiration: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'users',
    timestamps: true,
    // No need to define indexes manually unless you need a custom index
});
//# sourceMappingURL=user.js.map