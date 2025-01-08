// src/models/user.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Correct import for the sequelize instance
import { UserRole, UserTier } from '../types'; // Import enums for role and tier
import { Service } from './services'; // Assuming you have a Service model

// Define the attributes for the User model
interface UserAttributes {
  id: string;  // Use string for UUID
  email: string;
  username: string;
  password: string;
  role: UserRole;
  tier: UserTier;
  isVerified: boolean;
  passwordResetToken?: string | null;
  passwordResetTokenExpiry?: Date | null;
}

// Define the attributes required for creating a User (excluding the 'id' field)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;  // UUID for user ID
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: UserRole;
  public tier!: UserTier;
  public isVerified!: boolean;
  public passwordResetToken!: string | null;
  public passwordResetTokenExpiry!: Date | null;

  // Define the relationship with the Service model
  static associate() {
    this.hasMany(Service, {
      foreignKey: 'userId', // Assuming the foreign key in Service is userId
      as: 'services',
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,  // Use UUID for the id field
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,  // Automatically generate UUID
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tier: {
      type: DataTypes.ENUM,
      values: Object.values(UserTier),  // Ensure enum values are passed correctly
      defaultValue: UserTier.Free,
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(UserRole),  // Ensure enum values are passed correctly
      defaultValue: UserRole.User,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    sequelize,
    modelName: 'User',  // Model name
    tableName: 'users',  // Specify the table name
    timestamps: true,  // Enable createdAt and updatedAt
  }
);

// Initialize associations
User.associate();

export { User };
