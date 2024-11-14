// src/models/user.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  // Define attributes here
}

User.init(
  {
    // Model attributes (columns) definition
  },
  { sequelize, modelName: 'User' }
);

export default User;
