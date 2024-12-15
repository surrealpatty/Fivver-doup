"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Ensure this import path is correct
const uuid_1 = require("uuid"); // Add UUID generator for id
// Define the User model class
class User extends sequelize_1.Model {
    // Static method to associate models (can be added later if needed)
    static associate(models) {
        // Define associations here if any, e.g., User.hasMany(models.Order);
    }
}
exports.User = User;
// Initialize the Sequelize User model
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID, // Use UUID for id
        defaultValue: uuid_1.v4, // Automatically generate UUID for new records
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true, // Unique constraint on the email field
        allowNull: false,
        validate: {
            isEmail: true, // Ensures email format is valid
        },
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true, // Ensures that the username column is unique
        allowNull: false,
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
        allowNull: true, // Can be null
    },
    passwordResetTokenExpiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Can be null
    },
}, {
    sequelize: database_1.sequelize, // Pass the Sequelize instance
    modelName: 'User',
    tableName: 'users', // Name of the table in the database
    timestamps: true, // Automatically manage createdAt, updatedAt fields
    indexes: [
        {
            unique: true,
            fields: ['email'], // Create a unique index on the email field
        },
        {
            unique: true,
            fields: ['username'], // Create a unique index on the username field
        },
    ],
});
exports.default = User;
//# sourceMappingURL=user.js.map