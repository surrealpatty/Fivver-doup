import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define the attributes of the User model
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role?: 'free' | 'paid'; // Add role attribute (optional, free or paid role)
  createdAt?: Date; // Optional because Sequelize manages timestamps
  updatedAt?: Date; // Optional because Sequelize manages timestamps
}

// Define the attributes required for creating a new User
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role?: 'free' | 'paid'; // Add role field to the class implementation

  public readonly createdAt!: Date; // Sequelize automatically manages this
  public readonly updatedAt!: Date; // Sequelize automatically manages this
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
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
      type: DataTypes.ENUM('free', 'paid'), // Define ENUM for role
      defaultValue: 'free', // Set default role to "free"
      allowNull: false, // Ensure the role is always present
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'User', // Name of the model
    tableName: 'users', // Name of the table in the database
    timestamps: true, // Enable createdAt and updatedAt
  }
);

// Export the User model
export { User };
