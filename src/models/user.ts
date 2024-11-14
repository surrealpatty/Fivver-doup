import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Service from './services';  // Import related models

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'Free' | 'Paid';
  subscriptionStatus: 'Inactive' | 'Active';
  subscriptionStartDate: Date | null;
  subscriptionEndDate: Date | null;
  firstName: string | null;
  lastName: string | null;
}

// Optional attributes for user creation
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: 'Free' | 'Paid';
  public subscriptionStatus!: 'Inactive' | 'Active';
  public subscriptionStartDate!: Date | null;
  public subscriptionEndDate!: Date | null;
  public firstName!: string | null;
  public lastName!: string | null;

  // Define associations here
  static associate(models: any) {
    User.hasMany(models.Service, { foreignKey: 'userId', as: 'services' });
  }
}

// Initialize the User model
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
    role: {
      type: DataTypes.ENUM('Free', 'Paid'),
      allowNull: false,
      defaultValue: 'Free',
    },
    subscriptionStatus: {
      type: DataTypes.ENUM('Inactive', 'Active'),
      allowNull: false,
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'last_name', // Map lastName to last_name in the database
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,  // Add timestamps to capture createdAt and updatedAt
  }
);

// Export the User model
export default User;
