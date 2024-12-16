"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
// Define the User model class
class User extends sequelize_1.Model {
    static associate(models) {
        // Define associations here
    }
}
exports.User = User;
// Initialize the User model
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: uuid_1.v4,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false, // or remove 'unique' entirely    
        validate: {
            isEmail: true, // Validate the email format
        },
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure the username is unique
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tier: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false, // Default to false
    },
    passwordResetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Can be null if not in use
    },
    passwordResetTokenExpiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Can be null if not in use
    },
}, {
    sequelize: database_1.sequelize, // Pass the Sequelize instance
    modelName: 'User', // Define the model name
    tableName: 'users', // Ensure this matches your table name
    timestamps: true, // Automatically add createdAt and updatedAt fields
});
exports.default = User;
//# sourceMappingURL=user.js.map