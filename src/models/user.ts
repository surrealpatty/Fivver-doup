// src/models/user.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string; // Ensure password is part of the UserAttributes interface
  role: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string; // Define password here
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      // Define the password field
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
