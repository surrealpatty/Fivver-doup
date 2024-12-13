"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Adjust the path if necessary
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW, // Automatically sets the current time when a record is created
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW, // Automatically updates the time when the record is updated
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize, // Pass the Sequelize instance here
    modelName: 'User',
    tableName: 'users', // Adjust the table name if necessary
    timestamps: true, // Sequelize will manage createdAt and updatedAt
});
//# sourceMappingURL=user.js.map