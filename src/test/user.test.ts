import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Correctly import the sequelize instance

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
    sequelize, // Using the imported sequelize instance
    modelName: 'User',
    tableName: 'users', // Custom table name
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  }
);

// Optionally sync the model with the database (e.g., on app startup)
sequelize.sync()
  .then(() => console.log('User model synchronized with the database'))
  .catch((err) => console.error('Error syncing the User model:', err));

export { User, UserAttributes, UserCreationAttributes };
