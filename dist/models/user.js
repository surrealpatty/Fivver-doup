"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database")); // Correct path to your sequelize instance
// Define the User model class
class User extends sequelize_1.Model {
}
// Initialize the User model
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subscriptionStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default, // Pass the sequelize instance to associate with the model
    modelName: 'User',
    tableName: 'users', // Optional: Specify table name if it's different from the default (pluralized model name)
    timestamps: true, // Enable automatic createdAt and updatedAt timestamps
});
exports.default = User; // Export the User model
//# sourceMappingURL=user.js.map