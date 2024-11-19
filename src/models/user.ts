// src/models/user.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define UserAttributes
export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Define UserCreationAttributes (for when creating a new instance)
export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  static associate(models: any) {
    // Define relationships here
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.belongsToMany(models.Service, { through: 'UserServices' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
