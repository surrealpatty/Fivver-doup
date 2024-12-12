import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Ensure the sequelize instance is imported

// Define the UserAttributes interface
interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  tier: string;
  isVerified: boolean;
  resetToken: string | null;
  resetTokenExpiration: number | null;
}

// Define the UserCreationAttributes interface (for creating new users)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public tier!: string;
  public isVerified!: boolean;
  public resetToken!: string | null;
  public resetTokenExpiration!: number | null;
}

// Initialize the User model with the correct types
User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
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
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'free',  // Default tier is 'free'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,  // Default value for isVerified is false
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,  // Allow null values for resetToken
    },
    resetTokenExpiration: {
      type: DataTypes.BIGINT,
      allowNull: true,  // Allow null values for resetTokenExpiration
    },
  },
  {
    sequelize,  // Use the sequelize instance
    modelName: 'User',
    tableName: 'users',
  }
);

export { User };
