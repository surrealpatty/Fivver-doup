import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public tier!: string;
  public isVerified!: boolean;
  public passwordResetToken!: string; // Add passwordResetToken field
  public passwordResetTokenExpiry!: Date; // Add passwordResetTokenExpiry field
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      unique: true, // Ensure uniqueness for username
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // Email should also be unique
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
    passwordResetToken: {
      type: DataTypes.STRING, // Define passwordResetToken field
      allowNull: true, // Can be null initially
    },
    passwordResetTokenExpiry: {
      type: DataTypes.DATE, // Define passwordResetTokenExpiry field
      allowNull: true, // Can be null initially
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

