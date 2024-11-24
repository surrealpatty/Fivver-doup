import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Service from './services'; // Import the Service model for the association

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

// One-to-many relationship with Service
User.hasMany(Service, { foreignKey: 'userId', as: 'services' });
Service.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    modelName: 'User',
  }
);

export default User;  // Default export for User model
