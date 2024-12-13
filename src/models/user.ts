import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface UserAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  tier: string; 
  resetToken?: string;
  resetTokenExpiration?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public tier!: string; // Added the tier property
  public resetToken?: string;
  public resetTokenExpiration?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true, 
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
      allowNull: true, // Adjust as needed (optional, required, etc.)
    },
    tier: { // Added the tier definition
      type: DataTypes.STRING,
      allowNull: true, // Adjust as needed (optional, required, etc.)
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export { User };