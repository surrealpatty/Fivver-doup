"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Assuming sequelize is properly exported from database.ts
class User extends sequelize_1.Model {
}
// Initialize the model with proper column definitions
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
        defaultValue: 'Free', // Default value for role
    },
    subscriptionStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Inactive', // Default value for subscriptionStatus
    },
    subscriptionStartDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Optional field, nullable
    },
    subscriptionEndDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Optional field, nullable
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    tableName: 'users', // Explicitly defining table name
    timestamps: false, // Disabling automatic timestamps if not required
});
exports.default = User;
//# sourceMappingURL=user.js.map