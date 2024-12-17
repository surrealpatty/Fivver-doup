import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

// Define the User attributes interface
interface UserAttributes {
  id: string; // Ensure the id is UUID (string)
  email: string;
  username: string;
  password: string;
  role: string;
  tier: number; // Ensure tier is an integer
  isVerified: boolean;
  passwordResetToken?: string | null;
  passwordResetTokenExpiry?: Date | null;
}

// Define creation attributes interface (id is optional for creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public tier!: number; // Ensure this is a number
  public isVerified!: boolean;
  public passwordResetToken?: string | null;
  public passwordResetTokenExpiry?: Date | null;

  static associate(models: any) {
    // Define associations here if necessary
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
        isEmail: true, // Ensure the email format is valid
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
      allowNull: true, // Optional role
      defaultValue: 'user', // Default to 'user' if no role is specified
    },
    tier: {
      type: DataTypes.INTEGER, // Ensure 'tier' is an integer (0 or 1 for free/paid)
      allowNull: true, // Allow null value if no tier is provided
      defaultValue: 0, // Default to 0 ('free' tier)
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true, // Allow null if not verified
      defaultValue: false, // Default to false if not verified
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true, // Can be null if no reset token is used
    },
    passwordResetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true, // Can be null if no expiry date is set
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'User', // Define the model name
    tableName: 'users', // Make sure this matches your actual database table name
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export default User;
