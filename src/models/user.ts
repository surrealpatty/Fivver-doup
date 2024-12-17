import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure the sequelize instance is correctly imported
import { v4 as uuidv4 } from 'uuid';

// Define the User attributes interface
interface UserAttributes {
  id: string; // UUID for the id
  email: string;
  username: string;
  password: string;
  role: string;
  tier: 'free' | 'paid'; // Enum to represent 'free' and 'paid'
  isVerified: boolean;
  passwordResetToken?: string | null;
  passwordResetTokenExpiry?: Date | null;
  createdAt?: Date; // Optional as Sequelize will handle these
  updatedAt?: Date;
}

// Define creation attributes interface (id is optional for creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Define the User model class
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public tier!: 'free' | 'paid'; // Enum for tier
  public isVerified!: boolean;
  public passwordResetToken?: string | null;
  public passwordResetTokenExpiry?: Date | null;
  public readonly createdAt!: Date; // Automatically handled by Sequelize
  public readonly updatedAt!: Date; // Automatically handled by Sequelize

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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Use CURRENT_TIMESTAMP for default value
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), // Update timestamp automatically
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
