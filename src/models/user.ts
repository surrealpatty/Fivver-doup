import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Adjust the import as necessary

// Define UserAttributes interface, which represents the attributes of a User model
export interface UserAttributes {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    tier: string;
    isVerified: boolean;
    passwordResetToken: string | null;
    passwordResetTokenExpiry: Date | null;
}

// Define UserCreationAttributes interface, which represents the attributes when creating a User
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model, extending Sequelize's Model with UserAttributes and UserCreationAttributes
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public role!: string;
    public tier!: string;
    public isVerified!: boolean;
    public passwordResetToken!: string | null;
    public passwordResetTokenExpiry!: Date | null;
}

// Initialize the User model with the correct column definitions
User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      unique: true, // Ensure uniqueness for username
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // Email should also be unique
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
      type: DataTypes.STRING, // Define passwordResetToken field
      allowNull: true, // Can be null initially
    },
    passwordResetTokenExpiry: {
      type: DataTypes.DATE, // Define passwordResetTokenExpiry field
      allowNull: true, // Can be null initially
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);
