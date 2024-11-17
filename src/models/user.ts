// src/models/user.ts

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';  // Correct path to your sequelize instance
import { v4 as uuidv4 } from 'uuid';

class User extends Model {
    public id!: string;
    public email!: string;
    public password!: string;
    public username!: string;
    public role!: string;
    public firstName!: string;
    public lastName!: string;
    public subscriptionStatus!: string; // Add subscriptionStatus field
    public subscriptionStartDate!: Date;
    public subscriptionEndDate!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4(),
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user',
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subscriptionStatus: {
            type: DataTypes.STRING,
            allowNull: true,  // This can be null if not provided
            defaultValue: 'Inactive',  // Default value if not specified
        },
        subscriptionStartDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        subscriptionEndDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;
