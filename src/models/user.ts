import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IUserCreationAttributes, IUserAttributes } from '../types';  // Adjust the path to your interfaces

// Define the User model class
export const defineUser = (sequelize: Sequelize) => {
  class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
    // Define properties for the model
    id!: string;  // UUID for user ID
    username!: string;
    email!: string;
    password!: string;
    isPaid!: boolean;

    // You can add class or instance methods here if needed
  }

  // Initialize the User model with the attributes
  User.init(
    {
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
      isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,  // Sequelize instance
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    }
  );

  return User;
};
