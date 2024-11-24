// src/models/user.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define User attributes
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: 'users' }
);

export default User;  // Default export of the User class
