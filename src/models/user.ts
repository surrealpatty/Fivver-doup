// src/models/user.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define attributes for the User model
interface UserAttributes {
  id: number;
  email: string;
  password: string;
  username: string;
  role: 'free' | 'paid';
}

// Define creation attributes for the User model
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public email!: string;
  public password!: string;
  public username!: string;
  public role!: 'free' | 'paid';
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('free', 'paid'),
      defaultValue: 'free',
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: 'User', // Define the model name
  }
);

export { User, UserCreationAttributes }
