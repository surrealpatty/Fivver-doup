import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';  // Correct path to your sequelize instance
import { v4 as uuidv4 } from 'uuid';

class User extends Model {
    public id!: string;
    public email!: string;
    public password!: string;
    public username!: string; // Add username field
    public role!: string; // Add role field
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4(), // Automatically generate UUID
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
            allowNull: false, // Ensure username is required
            unique: true, // Optionally make it unique
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false, // Ensure role is required
            defaultValue: 'user', // Default role (you can adjust this)
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;
