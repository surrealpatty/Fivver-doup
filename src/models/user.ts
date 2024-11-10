// src/models/user.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';  // Ensure correct path

// Define the UserAttributes interface
export interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role: string;
    subscriptionStatus: string;
    createdAt: Date;
    updatedAt: Date;
}

// User model definition
export class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public firstName?: string;
    public lastName?: string;
    public role!: string;
    public subscriptionStatus!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

// Initialize User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true, // optional
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true, // optional
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Free',
        },
        subscriptionStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Inactive',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,  // Automatically set to the current timestamp
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,  // Automatically set to the current timestamp
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    }
);

export default User;
