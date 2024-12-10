import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface UserAttributes {
  id: number;
  email: string;
  username: string;
  password: string;
  role: string;
  tier: string;
  isVerified: boolean;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public tier!: string;
  public isVerified!: boolean;

  // Other model options and associations
}

User.init(
  {
    id: {  // Add the id field to the model definition
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,  // Ensure id is auto-incremented
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'free',  // Default role value
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'free',  // Default tier value
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default verification status
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);
