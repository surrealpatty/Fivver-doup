// src/models/user.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface UserAttributes {
  id: number;
  email: string;
  username: string;
  password: string;  // Add password property
  resetToken?: string;  // Add resetToken property
  resetTokenExpiration?: Date;  // Add resetTokenExpiration property
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public username!: string;
  public password!: string;  // Define password
  public resetToken?: string;  // Define resetToken
  public resetTokenExpiration?: Date;  // Define resetTokenExpiration
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,  // Allow null for the reset token
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true,  // Allow null for the reset token expiration
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export { User };
