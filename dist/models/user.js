"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4, // Automatically generate a UUID
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tier: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user', // Default value for role
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Default value for isVerified
    },
    resetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Can be null initially
    },
    resetTokenExpiration: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Can be null initially
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
});
//# sourceMappingURL=user.js.map