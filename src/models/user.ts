import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

// Define the User attributes interface
interface UserAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  tier: number; // Changed to number
  isVerified: boolean;
  passwordResetToken?: string | null;
  passwordResetTokenExpiry?: Date | null;
}

// Define creation attributes interface
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public tier!: number; // Changed to number
  public isVerified!: boolean;
  public passwordResetToken?: string | null;
  public passwordResetTokenExpiry?: Date | null;

  static associate(models: any) {
    // Define associations here
  }
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Validate the email format
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true, // Change to true to make it optional
      defaultValue: 'user', // Optional: Set a default value
    },
    tier: {
      type: DataTypes.INTEGER, // Set as INTEGER to allow number values
      allowNull: true, // Change to true to make it optional
      defaultValue: 0, // Optional: Set a default value (0 or any other number)
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true, // Change to true to make it optional
      defaultValue: false, // Optional: Set a default value
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true, // Can be null if not in use
    },
    passwordResetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true, // Can be null if not in use
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'User', // Define the model name
    tableName: 'users', // Ensure this matches your table name
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export default User;
