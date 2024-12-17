import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Make sure the sequelize instance is correctly imported
import { v4 as uuidv4 } from 'uuid';

// Define the User attributes interface
interface UserAttributes {
  id: string; // UUID for the id
  email: string;
  username: string;
  password: string;
  role: string;
  tier: 'free' | 'paid'; // Change to ENUM to represent 'free' and 'paid'
  isVerified: boolean;
  passwordResetToken?: string | null;
  passwordResetTokenExpiry?: Date | null;
}

// Define creation attributes interface (id is optional for creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public tier!: 'free' | 'paid';  // Enum for tier
  public isVerified!: boolean;
  public passwordResetToken?: string | null;
  public passwordResetTokenExpiry?: Date | null;

  static associate(models: any) {
    // Define associations here if necessary (e.g., User has many Posts)
  }
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Validate email format
      },
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
      allowNull: true, // Optional role
      defaultValue: 'user', // Default to 'user'
    },
    tier: {
      type: DataTypes.ENUM('free', 'paid'), // Ensure 'tier' is an ENUM with 'free' and 'paid' values
      allowNull: false,
      defaultValue: 'free', // Default to 'free' if not provided
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // Must be verified or not
      defaultValue: false, // Default to false
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true, // Can be null if no reset token is used
    },
    passwordResetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true, // Can be null if no expiry date is set
    },
  },
  {
    sequelize, // Pass the Sequelize instance here
    modelName: 'User', // Define the model name
    tableName: 'users', // Ensure this matches your actual database table name
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export default User;
