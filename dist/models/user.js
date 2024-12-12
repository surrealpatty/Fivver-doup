"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Assuming sequelize is exported from this path
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: database_1.sequelize.literal('UUID()'),
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: database_1.sequelize.fn('NOW'), // Using `sequelize.fn` to set the current timestamp
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: database_1.sequelize.fn('NOW'), // Default to current timestamp
    },
}, {
    tableName: 'Users',
    sequelize: database_1.sequelize, // passing the sequelize instance
    timestamps: true, // Enable automatic management of `created_at` and `updated_at`
    updatedAt: 'updated_at', // Specify that the `updated_at` field should be used for auto-updates
    createdAt: 'created_at', // Specify the `created_at` field
});
exports.default = User;
//# sourceMappingURL=user.js.map