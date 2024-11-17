import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Correct path to your sequelize instance
import { v4 as uuidv4 } from 'uuid';

// Define the type for User attributes
interface UserAttributes {
    id: string;
    email: string;
    password: string;
    username: string;
    role: string;
}

// Define the type for User creation (fields that can be omitted when creating a new user)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public email!: string;
    public password!: string;
    public username!: string;
    public role!: string;

    // Timestamps (optional) - if you use createdAt and updatedAt fields
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
