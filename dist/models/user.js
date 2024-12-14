"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Make sure the path is correct
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
        type: sequelize_1.DataTypes.STRING, // id as a string (e.g., UUID)
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true, // Ensures that the email column is unique
        allowNull: false,
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
        defaultValue: false,
    },
    passwordResetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Can be null initially
    },
    passwordResetTokenExpiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Can be null initially
    },
}, {
    sequelize: database_1.sequelize, // Pass the Sequelize instance
    modelName: 'User',
    tableName: 'users', // Name of the table in the database
    timestamps: true, // Adjust based on your table schema (if using createdAt, updatedAt)
});
//# sourceMappingURL=user.js.map