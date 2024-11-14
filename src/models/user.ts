import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/database'; // Assuming sequelize is properly exported from database.ts

class User extends Model {
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
            defaultValue: 'Free',
        },
        subscriptionStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Inactive',
        },
        subscriptionStartDate: {
            type: DataTypes.DATE,
            allowNull: true, // Optional
        },
        subscriptionEndDate: {
            type: DataTypes.DATE,
            allowNull: true, // Optional
        },
    },
    {
        sequelize,
        modelName: 'User', // Model name in DB
        tableName: 'users', // Explicitly defining table name (optional but helpful)
        timestamps: false, // Disabling automatic timestamps if you don't want `createdAt` and `updatedAt`
    }
);

export default User;
