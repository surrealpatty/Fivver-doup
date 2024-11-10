import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database'; // Correct path to your sequelize instance

// Define the interface for the User attributes (what fields the model has)
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName?: string; // Optional attributes
  lastName?: string;
  role: string;
  subscriptionStatus: string;
}

// Define the interface for the creation attributes (fields that are allowed during creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public firstName?: string;
  public lastName?: string;
  public role!: string;
  public subscriptionStatus!: string;
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
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
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
    sequelize, // Pass the sequelize instance to associate with the model
    modelName: 'User',
    tableName: 'users', // Optional: Specify table name if it's different from the default (pluralized model name)
    timestamps: true, // Enable automatic createdAt and updatedAt timestamps
  }
);

export default User; // Export the User model
