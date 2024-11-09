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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Ensure this is correctly pointing to your Sequelize instance
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
    // Association method
    static associate(models) {
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
                user.password = yield bcryptjs_1.default.hash(user.password, 10);
            }
        });
    }
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
        validate: {
            len: [3, 50], // Username length constraint
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Validate that the email is valid
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100], // Password length constraint
        },
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
        type: sequelize_1.DataTypes.ENUM('Free', 'Paid'),
        allowNull: false,
        defaultValue: 'Free',
    },
    subscriptionStatus: {
        type: sequelize_1.DataTypes.ENUM('Inactive', 'Active'),
        allowNull: false,
        defaultValue: 'Inactive',
    },
    subscriptionStartDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    subscriptionEndDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize, // Make sure sequelize is correctly passed here
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
});
// Hook to hash password before creating and updating
User.beforeCreate(User.hashPassword);
User.beforeUpdate(User.hashPassword);
exports.default = User;
//# sourceMappingURL=user.js.map