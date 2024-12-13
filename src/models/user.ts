import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public resetToken!: string | null | undefined;  // Allow string, null, or undefined
  public resetTokenExpiration!: Date | null | undefined;  // Allow Date, null, or undefined
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,  // Allow null
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true,  // Allow null
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);
