// In src/models/user.ts

import { Optional, Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';  // assuming sequelize is configured

// Define User attributes (including optional fields like createdAt, updatedAt)
export interface UserAttributes {
    id: string;
    email: string;
    username: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define User creation attributes (without id and timestamps)
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Define the User model
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public email!: string;
    public username!: string;
    public password!: string;
    public role!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the User model
User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);
