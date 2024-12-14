// src/models/user.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class User extends Model {
  id!: number;
  email!: string;
  password!: string;
  username!: string;
  role?: string; // Add the role property
  tier?: string; // Add the tier property
  isVerified?: boolean; // Add the isVerified property
  resetToken?: string; // Add the resetToken property
  resetTokenExpiration?: Date; // Add the resetTokenExpiration property
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {  // Add the role field
      type: DataTypes.STRING,
      allowNull: true,
    },
    tier: {  // Add the tier field
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {  // Add the isVerified field
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false, // Optional default value
    },
    resetToken: {  // Add the resetToken field
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiration: {  // Add the resetTokenExpiration field
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
