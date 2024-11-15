import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Use named import

// Define the UserAttributes interface
export interface UserAttributes {
  id?: number; // Optional, since Sequelize generates this
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: string;
  subscriptionStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the User model class
class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public firstName?: string;
  public lastName?: string;
  public role!: string;
  public subscriptionStatus!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the model
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      allowNull: false,
      defaultValue: 'Free',
    },
    subscriptionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Inactive',
    },
  },
  {
    sequelize, // Reference the sequelize instance here
    tableName: 'users',
  }
);

export default User;
