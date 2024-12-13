import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

// Define the UserAttributes interface to specify the attributes of the User model
interface UserAttributes {
  id: string;  // UUID type for id
  email: string;
  username: string;
  password: string;
  role: string;
  tier: string;
  isVerified: boolean;
  resetToken?: string;
  resetTokenExpiration?: Date;
}

// Define the UserCreationAttributes interface that omits the 'id' for creation
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public tier!: string;
  public isVerified!: boolean;
  public resetToken?: string;
  public resetTokenExpiration?: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the User model with Sequelize
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4(), // Generate a new UUID for each user
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Ensure emails are unique
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,  // Make username required
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,  // Make password required
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user', // Default to 'user' role
    },
    tier: {
      type: DataTypes.STRING,
      defaultValue: 'free', // Default to 'free' tier
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default to false
    },
    resetToken: {
      type: DataTypes.STRING, // Allow for a reset token (if needed)
    },
    resetTokenExpiration: {
      type: DataTypes.DATE, // Allow for a reset token expiration date
    },
  },
  {
    sequelize,  // The Sequelize instance
    tableName: 'users',  // Table name in the database
  }
);

export { User, UserAttributes, UserCreationAttributes };
