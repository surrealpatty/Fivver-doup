// src/models/user.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Adjust the path as needed

// Define the attributes for the User model
interface UserAttributes {
  id: string;  // id as a string, assuming it's a string in the database
  email: string;
  username: string;
  password: string;
  role: string;
  tier: string;
  isVerified: boolean;
  passwordResetToken: string | null;  // Added passwordResetToken
  passwordResetTokenExpiry: Date | null;  // Added passwordResetTokenExpiry
}

// Interface for creation attributes (excluding `id` as it auto-generates)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public tier!: string;
  public isVerified!: boolean;
  public passwordResetToken: string | null = null; // Default to null
  public passwordResetTokenExpiry: Date | null = null; // Default to null
}

// Initialize the Sequelize User model
User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true, // Can be null initially
    },
    passwordResetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true, // Can be null initially
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: 'User',
    tableName: 'users',
    timestamps: true,  // Adjust this based on your table schema
  }
);

export { User };
