import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Assuming sequelize is properly exported from database.ts

// Define an interface for the attributes of the User model
interface UserAttributes {
    id: number;
    password: string;
    role: string;
    subscriptionStatus: string;
    subscriptionStartDate: Date | null;
    subscriptionEndDate: Date | null;
}

// Define an interface for creating a User (id is optional because it's auto-generated)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public password!: string;
    public role!: string;
    public subscriptionStatus!: string;
    public subscriptionStartDate!: Date | null;
    public subscriptionEndDate!: Date | null;
}

// Initialize the model with proper column definitions
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
            defaultValue: 'Free', // Default value for role
        },
        subscriptionStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Inactive', // Default value for subscriptionStatus
        },
        subscriptionStartDate: {
            type: DataTypes.DATE,
            allowNull: true, // Optional field, nullable
        },
        subscriptionEndDate: {
            type: DataTypes.DATE,
            allowNull: true, // Optional field, nullable
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users', // Explicitly defining table name
        timestamps: false, // Disabling automatic timestamps if not required
    }
);

export default User;
