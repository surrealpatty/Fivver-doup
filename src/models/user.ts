import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure correct import of sequelize instance

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: string;
  subscriptionStatus: string;
}

// Define the creation attributes for the User model (excluding id)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public firstName?: string;
  public lastName?: string;
  public role!: string;
  public subscriptionStatus!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      allowNull: true, // Optional, not required
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true, // Optional, not required
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscriptionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Using the imported sequelize instance
    modelName: 'User',
    tableName: 'users', // Ensure the table name matches your database schema
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  }
);

export { User, UserAttributes, UserCreationAttributes }; // Export User model, UserAttributes, and UserCreationAttributes for type checking
