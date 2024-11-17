// src/models/userModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // assuming sequelize is already configured

// Define interface for the User model attributes
export interface UserAttributes {
  id?: number;  // Optional because Sequelize auto-generates the id
  username: string;
  email: string;
  password: string;  // You should add a password field
  firstName?: string;
  lastName?: string;
  role?: string;
  subscriptionStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define interface for creation - excludes id (because it’s auto-generated)
export type UserCreationAttributes = Optional<UserAttributes, 'id'>

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public firstName?: string;
  public lastName?: string;
  public role?: string;
  public subscriptionStatus?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // You may want to enforce uniqueness for username
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // You may want to enforce uniqueness for email
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Free',  // Default role for a new user
    },
    subscriptionStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Inactive',  // Default subscription status
    },
  },
  {
    sequelize,  // Pass the sequelize instance
    modelName: 'User',  // Model name
    tableName: 'users',  // Table name in the database
    timestamps: true,  // Enable createdAt and updatedAt fields
  }
);

export default User;
