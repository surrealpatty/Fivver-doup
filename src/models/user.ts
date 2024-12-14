// src/models/user.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize }from '../config/database'; // Adjust the path as needed

class User extends Model {
  id!: string;
  email!: string;
  username!: string;
  password!: string;
  role!: string;
  tier!: string;
  isVerified!: boolean;
  resetToken!: string | null; // Added resetToken
  resetTokenExpiration!: Date | null; // Added resetTokenExpiration
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null since this will be used only during password reset
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true, // Allow null since this will be set only during password reset
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export { User };
