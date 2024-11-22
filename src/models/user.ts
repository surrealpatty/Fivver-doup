import { Sequelize, DataTypes, Model } from 'sequelize';
import { IUserCreationAttributes, IUserAttributes } from '../types'; // Import interfaces

// Define the User model class
export const defineUser = (sequelize: Sequelize) => {
  // The User class implements IUserAttributes and uses IUserCreationAttributes for the creation process
  class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
    // Define properties for the model with the correct types
    id!: string;  // UUID for user ID (string type, assumed from your design)
    username!: string;
    email!: string;
    password!: string;
    isPaid!: boolean;

    // Optionally, you can add class or instance methods here
  }

  // Initialize the User model with attributes and options
  User.init(
    {
      id: { 
        type: DataTypes.STRING,  // UUID type for 'id'
        primaryKey: true,         // Mark this as the primary key
        allowNull: false,         // Ensure 'id' is not null
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensure username is not null
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensure email is not null
        unique: true,      // Enforce uniqueness of email
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensure password is not null
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,  // Default value for new users
      },
    },
    {
      sequelize,  // Sequelize instance
      modelName: 'User',  // Model name
      tableName: 'users',  // Table name in the database
      timestamps: true,  // Enable automatic timestamps (createdAt, updatedAt)
    }
  );

  return User;
};
