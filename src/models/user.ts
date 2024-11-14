import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Service from './services';  // Import related models

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

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

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

  static associate(models: any) {
    // Define associations
    User.hasMany(models.Service, { foreignKey: 'userId', as: 'services' });
  }
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
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

export default User;
