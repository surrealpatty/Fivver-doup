// src/models/user.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define the attributes for the User model
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;  // Ensure the password field is included
  role: 'free' | 'paid';
}

// Define the creation attributes, omitting 'id' for creation
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;  // Define the password property
  public role!: 'free' | 'paid';
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.ENUM('free', 'paid'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

// Rename the exported interface to avoid conflict
export { UserCreationAttributes as IUserCreationAttributes };
