import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Import sequelize instance
import Service from './service'; // Import Service model for associations
import Order from './order'; // Import Order model for associations

// Define the attributes interface for the User model
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the User model class
class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations for User
  static associate(models: any) {
    // A user can have many services
    User.hasMany(models.Service, { foreignKey: 'userId', as: 'services' });

    // A user can have many orders
    User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
  }
}

// Initialize the User model
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
      unique: true,
      validate: {
        len: {
          args: [3, 50],
          msg: 'Username must be between 3 and 50 characters long',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email must be a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'Password must be at least 6 characters long',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export default User;
