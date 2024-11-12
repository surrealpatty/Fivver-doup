import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Adjust path if necessary

// Define the User model interface for TypeScript
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  subscriptionStatus: string;
  createdAt: Date; // We will now rely on default behavior
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt'> {} // createdAt is optional during creation

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public role!: string;
  public subscriptionStatus!: string;
  public createdAt!: Date; // Will be handled by Sequelize
}

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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Free', // Default role
    },
    subscriptionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Inactive', // Default subscription status
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically handle createdAt
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users', // The table name
    timestamps: false, // Disabling Sequelize's default createdAt/updatedAt columns
  }
);

export { User, UserAttributes, UserCreationAttributes };
