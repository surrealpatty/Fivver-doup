import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure this is the correct path for your database config

// Define the User attributes interface
interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    subscriptionStatus: string;
    createdAt: Date;  // createdAt from Sequelize
    updatedAt: Date;  // updatedAt from Sequelize
}

// The creation attributes will be a subset of UserAttributes, excluding `id` since it's auto-generated
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public role!: string;
    public subscriptionStatus!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Add any additional methods or validations if needed
}

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
            allowNull: false, // Optional but can be set as required if needed
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false, // Optional but can be set as required if needed
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Free', // Default to 'Free' if no role is provided
        },
        subscriptionStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Inactive', // Default to 'Inactive' if no subscription status is provided
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    }
);

// Function to initialize the User model (useful for syncing the DB)
export const initUser = async () => {
    await sequelize.sync(); // Sync the DB
};

export default User;
