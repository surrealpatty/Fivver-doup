import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Make sure sequelize is properly exported from database.js

// Define an interface for the attributes of the User model
interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    subscriptionStatus: string;
    subscriptionStartDate: Date | null;
    subscriptionEndDate: Date | null;
    firstName: string;
    lastName: string;
}

// Define an interface for creating a User (id is optional because it's auto-generated)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public role!: string;
    public subscriptionStatus!: string;
    public subscriptionStartDate!: Date | null;
    public subscriptionEndDate!: Date | null;
    public firstName!: string;
    public lastName!: string;

    // Define association method to set up associations with other models
    static associate(models: any) {
        User.hasMany(models.Service, { foreignKey: 'userId' });
    }
}

// Initialize the User model with proper column definitions
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
            allowNull: true,
        },
        subscriptionEndDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false, // Set to true if you want `createdAt` and `updatedAt` columns
    }
);

export default User;
