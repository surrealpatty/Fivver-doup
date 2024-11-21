import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Import the Sequelize instance from your config
import  User  from '../models/user'; // Correct named import for User

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
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
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
        isEmail: {
          msg: 'Must be a valid email address', // Custom error message for validation
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 128], // Enforce password length between 8 and 128 characters
          msg: 'Password must be between 8 and 128 characters',
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure username is unique
      validate: {
        len: {
          args: [3, 50], // Enforce username length between 3 and 50 characters
          msg: 'Username must be between 3 and 50 characters',
        },
      },
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    tableName: 'users', // Custom table name
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
    underscored: true, // Use snake_case for database column names
    modelName: 'User', // Optional: Name of the model
  }
);

export { User };
