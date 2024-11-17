// src/models/userModel.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database'; // assuming sequelize is already configured
class User extends Model {
    id;
    username;
    email;
    password;
    firstName;
    lastName;
    role;
    subscriptionStatus;
    createdAt;
    updatedAt;
}
// Initialize the model
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // You may want to enforce uniqueness for username
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // You may want to enforce uniqueness for email
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Free', // Default role for a new user
    },
    subscriptionStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Inactive', // Default subscription status
    },
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'User', // Model name
    tableName: 'users', // Table name in the database
    timestamps: true, // Enable createdAt and updatedAt fields
});
export default User;
