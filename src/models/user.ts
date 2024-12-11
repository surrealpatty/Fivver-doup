import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure you're importing sequelize from the correct path

// Define the UserAttributes interface with nullable resetToken and resetTokenExpiration
interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  tier: string;
  isVerified: boolean;
  resetToken: string | null; // Allow null for resetToken
  resetTokenExpiration: number | null; // Allow null for resetTokenExpiration
}

// Define the User model
class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public tier!: string;
  public isVerified!: boolean;
  public resetToken!: string | null; // Allow null for resetToken
  public resetTokenExpiration!: number | null; // Allow null for resetTokenExpiration
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
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
      allowNull: false,
      defaultValue: false,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null values for resetToken
    },
    resetTokenExpiration: {
      type: DataTypes.BIGINT, // Use BIGINT for expiration time
      allowNull: true, // Allow null values for resetTokenExpiration
    },
  },
  {
    sequelize, // Use the sequelize instance
    modelName: 'User',
    tableName: 'users',
  }
);

export { User };
