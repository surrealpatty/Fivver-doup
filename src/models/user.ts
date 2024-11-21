import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Import your Sequelize instance from the config file

// Define the interface for User attributes
interface UserAttributes {
    id: number;
    email: string;
    password: string;
    username: string;
}

// Define the interface for User creation (excluding the id since it auto-generates)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public username!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the User model with the Sequelize instance
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure email is unique
            validate: {
                isEmail: true, // Validate email format
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // Pass the Sequelize instance
        tableName: 'users', // Optional: You can specify a custom table name
    }
);

export { User };
