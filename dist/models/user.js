"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Ensure this is correctly pointing to your Sequelize instance
const bcrypt = require('bcryptjs');
// User model definition
class User extends Model {
    static associate(models) {
        // Define associations here if needed, e.g., Review association
        User.hasMany(models.Review, {
            foreignKey: 'userId',
            as: 'reviews',
            onDelete: 'CASCADE',
        });
    }
    // Hash the user's password before saving to the database
    static hashPassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.password) {
                user.password = yield bcrypt.hash(user.password, 10);
            }
        });
    }
}
// Initialize the User model
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 50], // Username length constraint
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Validate that the email is valid
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100], // Password length constraint
        },
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM('Free', 'Paid'),
        allowNull: false,
        defaultValue: 'Free',
    },
    subscriptionStatus: {
        type: DataTypes.ENUM('Inactive', 'Active'),
        allowNull: false,
        defaultValue: 'Inactive',
    },
    subscriptionStartDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    subscriptionEndDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize, // Pass sequelize instance here
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
});
// Hook to hash password before creating and updating
User.beforeCreate(User.hashPassword);
User.beforeUpdate(User.hashPassword);
module.exports = User;
//# sourceMappingURL=user.js.map