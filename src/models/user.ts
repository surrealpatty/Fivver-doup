import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure this import path is correct
import { v4 as uuidv4 } from 'uuid'; // Add UUID generator for id

// Define the User attributes interface (for typing the model)
interface UserAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  tier: string;
  isVerified: boolean;
  passwordResetToken?: string | null;  // Allow null
  passwordResetTokenExpiry?: Date | null;  // Allow null
}

// Define the User creation attributes interface (for creating new instances)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;  // UUID primary key
  public email!: string;  // Email field (unique)
  public username!: string;  // Username (unique)
  public password!: string;  // Password field
  public role!: string;  // Role (e.g., user, admin)
  public tier!: string;  // Tier (e.g., free, paid)
  public isVerified!: boolean;  // Verification status
  public passwordResetToken?: string | null;  // Password reset token (optional)
  public passwordResetTokenExpiry?: Date | null;  // Password reset token expiry (optional)

  // Static method to associate models (can be added later if needed)
  static associate(models: any) {
    // Define associations here if any, e.g., User.hasMany(models.Order);
  }
}

// Initialize the Sequelize User model
User.init(
  {
    id: {
      type: DataTypes.UUID,  // Use UUID for id
      defaultValue: uuidv4,  // Automatically generate UUID for new records
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,  // Unique constraint on the email field
      allowNull: false,
      validate: {
        isEmail: true,  // Ensures email format is valid
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: true,  // Ensures that the username column is unique
      allowNull: false,
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
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,  // Default to false
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,  // Can be null
    },
    passwordResetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,  // Can be null
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'User',
    tableName: 'users', // Name of the table in the database
    timestamps: true, // Automatically manage createdAt, updatedAt fields
  }
);

export default User;
