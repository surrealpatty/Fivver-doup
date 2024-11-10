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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUser = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Ensure this is the correct path for your database config
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
});
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // optional
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // optional
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Free',
    },
    subscriptionStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Inactive',
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});
// Function to initialize the User model (useful for syncing the DB)
const initUser = () => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.sync(); // Sync the DB
});
exports.initUser = initUser;
exports.default = User;
//# sourceMappingURL=user.js.map