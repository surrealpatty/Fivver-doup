"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Correct import for sequelize
// Define the User model class
class User extends sequelize_1.Model {
    // Define associations (if needed)
    static associate(models) {
        // Example associations, uncomment as needed:
        // User.hasMany(models.Order); // if User has many Orders
        // User.belongsTo(models.Role); // if User belongs to Role
    }
}
// Initialize the User model
User.init({
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure the username is unique
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure the email is unique
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Allow null for firstName
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Allow null for lastName
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('Free', 'Paid'), // Restrict role to 'Free' or 'Paid'
        allowNull: false,
        defaultValue: 'Free', // Default role to 'Free'
    },
    subscriptionStatus: {
        type: sequelize_1.DataTypes.ENUM('Active', 'Inactive'), // Restrict subscriptionStatus to 'Active' or 'Inactive'
        allowNull: false,
        defaultValue: 'Inactive', // Default subscription status to 'Inactive'
    },
    subscriptionStartDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Allow null if not yet set
    },
    subscriptionEndDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Allow null if not yet set
    },
}, {
    sequelize: database_1.sequelize, // Pass the sequelize instance
    tableName: 'users', // Specify the table name
    timestamps: true, // Enable Sequelize to handle createdAt and updatedAt
    createdAt: 'createdAt', // Map Sequelize's createdAt to 'createdAt' column
    updatedAt: 'updatedAt', // Map Sequelize's updatedAt to 'updatedAt' column
    underscored: true, // Use snake_case for column names (e.g., `created_at`)
});
exports.default = User;
//# sourceMappingURL=user.js.map