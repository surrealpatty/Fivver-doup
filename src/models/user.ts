import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define the User attributes type
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: string;
  subscriptionStatus: string;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
}

// Define the creation attributes type (optional fields for creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public firstName?: string;
  public lastName?: string;
  public role!: string;
  public subscriptionStatus!: string;
  public subscriptionStartDate?: Date;
  public subscriptionEndDate?: Date;
}

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
      defaultValue: 'Free',
    },
    subscriptionStatus: {
      type: DataTypes.STRING,
      defaultValue: 'Inactive',
    },
    subscriptionStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    subscriptionEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Optionally define the table name if different from model name
  }
);

export default User; // Default export
