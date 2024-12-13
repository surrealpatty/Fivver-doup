import { Model, DataTypes } from 'sequelize';
import { sequelize } from 'config/database';

export class User extends Model {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public isVerified!: boolean;
  public role!: string;
  public tier!: number;
  public resetToken?: string; // Add resetToken field
  public resetTokenExpiration?: Date; // Add resetTokenExpiration field

  // Add any additional methods if needed
}

User.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    email: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: { type: DataTypes.STRING },
    tier: { type: DataTypes.INTEGER, defaultValue: 1 },
    resetToken: { type: DataTypes.STRING, allowNull: true }, // Add resetToken field
    resetTokenExpiration: { type: DataTypes.DATE, allowNull: true }, // Add resetTokenExpiration field
  },
  { sequelize, modelName: 'User' }
);
