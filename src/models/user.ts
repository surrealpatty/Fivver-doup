// src/models/user.ts

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class User extends Model {
    public id!: number;
    public password!: string;
    public role!: string;
    public subscriptionStatus!: string;
    public subscriptionStartDate!: Date;
    public subscriptionEndDate!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
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
        subscriptionStartDate: {
            type: DataTypes.DATE,
        },
        subscriptionEndDate: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;
