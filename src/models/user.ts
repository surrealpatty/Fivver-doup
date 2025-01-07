import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Assuming this is where sequelize instance is configured

// Define and export UserRole and UserTier Enums at the top of the file
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserTier {
  FREE = 'free',
  PAID = 'paid',
}

// Define the UserAttributes interface which reflects the fields in the database
export interface UserAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  tier: UserTier;
  isVerified: boolean;
  passwordResetToken?: string | null;
  passwordResetTokenExpiry?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the UserCreationAttributes interface for creation attributes (excluding id as it is auto-generated)
// Mark 'id' as optional here as it will be auto-generated
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: string;
  email!: string;
  username!: string;
  password!: string;
  role!: UserRole;
  tier!: UserTier;
  isVerified!: boolean;
  passwordResetToken?: string | null;
  passwordResetTokenExpiry?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

// Define the User model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Automatically generate UUID for the id
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.USER, // Default to 'user' role
    },
    tier: {
      type: DataTypes.ENUM(...Object.values(UserTier)),
      allowNull: false,
      defaultValue: UserTier.FREE, // Default to 'free' tier
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default to false
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize, // Sequelize instance
    tableName: 'users',
    timestamps: true, // Enable createdAt and updatedAt
  }
);

