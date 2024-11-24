// src/models/user.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

// Define the User model
export class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  // Add other fields as needed
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
    // Other fields...
  },
  {
    sequelize,
    tableName: 'users', // Specify the table name
  }
);

export default User;
