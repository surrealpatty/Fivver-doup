// src/models/user.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class User extends Model {
  id!: number;
  email!: string;
  password!: string;
  username!: string;
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
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export { User };
