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
const database_js_1 = __importDefault(require("../config/database.js")); // Ensure the correct path for database configuration
const bcrypt_1 = __importDefault(require("bcrypt")); // Import bcrypt for password hashing
class User extends sequelize_1.Model {
    // Define associations if any
    static associate(models) {
        // Example: association with the Review model (if you have a relation)
        // Ensure that the Review model is imported and exists in your models folder
        User.hasMany(models.Review, {
            foreignKey: 'userId',
            as: 'reviews',
            onDelete: 'CASCADE',
        });
    }
    // Password hash before saving user
    static hashPassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.password) {
                user.password = yield bcrypt_1.default.hash(user.password, 10); // Hash password before saving
            }
        });
    }
}
// Initialize the User model with the schema and Sequelize settings
User.init({
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure the username is unique
        validate: {
            len: {
                args: [3, 50],
                msg: 'Username must be between 3 and 50 characters long',
            },
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure the email is unique
        validate: {
            isEmail: {
                msg: 'Please provide a valid email address',
            },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 100], // Enforce a minimum password length
                msg: 'Password must be between 6 and 100 characters long',
            },
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
        type: sequelize_1.DataTypes.ENUM('Free', 'Paid'), // Define "Free" and "Paid" roles
        allowNull: false,
        defaultValue: 'Free', // Default to "Free"
    },
    subscriptionStatus: {
        type: sequelize_1.DataTypes.ENUM('Inactive', 'Active'), // Subscription status (Inactive or Active)
        allowNull: false,
        defaultValue: 'Inactive', // Default to "Inactive"
    },
    subscriptionStartDate: {
        type: sequelize_1.DataTypes.DATE, // When the subscription started
        allowNull: true, // Can be null initially
    },
    subscriptionEndDate: {
        type: sequelize_1.DataTypes.DATE, // When the subscription will expire
        allowNull: true, // Can be null initially
    },
}, {
    sequelize: database_js_1.default, // Pass Sequelize instance for database connection
    modelName: 'User', // Model name is 'User'
    tableName: 'users', // Table name in the database
    timestamps: true, // Automatically create 'createdAt' and 'updatedAt'
    underscored: true, // Use snake_case in the table column names
});
// Hook to hash password before creating or updating a user
User.beforeCreate(User.hashPassword);
User.beforeUpdate(User.hashPassword);
exports.default = User; // Export the model for use in other parts of the application
//# sourceMappingURL=user.js.map