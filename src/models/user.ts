// src/models/user.ts
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure the sequelize instance is correctly imported
import { v4 as uuidv4 } from 'uuid'; // To generate UUID for the id

// Define the User attributes interface
interface UserAttributes {
  id: string; // UUID for the id
  email: string;
  username: string;
  password: string;
  role: string;
  tier: 'free' | 'paid'; // Enum for tier
  isVerified: boolean;
  passwordResetToken?: string | null;
  passwordResetTokenExpiry?: Date | null;
  createdAt?: Date; // Optional, Sequelize handles this
  updatedAt?: Date; // Optional, Sequelize handles this
  bio?: string; // Optional bio field
}

// Define the creation attributes interface (id, createdAt, and updatedAt are optional for creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public tier!: 'free' | 'paid'; // Enum for tier
  public isVerified!: boolean;
  public passwordResetToken?: string | null;
  public passwordResetTokenExpiry?: Date | null;
  public readonly createdAt!: Date; // Automatically handled by Sequelize
  public readonly updatedAt!: Date; // Automatically handled by Sequelize
  public bio?: string; // Optional field

  // Method to check if the user is paid
  get isPaid(): boolean {
    return this.tier === 'paid'; // Based on the 'tier' field, not 'role'
  }

  // Check if the password matches (simplified for demonstration; should use hashing)
  checkPassword(password: string): boolean {
    return this.password === password;
  }

  static associate(models: any) {
    // Define any associations if necessary, e.g., User.hasMany(models.Post);
  }
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4, // Generate a UUID by default
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Ensure the email is valid
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
      defaultValue: 'user', // Default role is 'user'
    },
    tier: {
      type: DataTypes.ENUM('free', 'paid'),
      allowNull: false,
      defaultValue: 'free', // Default tier is 'free'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default to not verified
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true, // Can be null if no token
    },
    passwordResetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true, // Can be null if no expiry set
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true, // Optional bio field
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Use the current timestamp
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), // Update timestamp automatically
    },
  },
  {
    sequelize, // Sequelize instance
    modelName: 'User', // Model name
    tableName: 'users', // Table name in the database
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

export default User; // Default export of the User model
