import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Import sequelize instance
import { UserRole, UserTier } from '../types/UserRoles'; // Enum for User roles and tiers
import { v4 as uuidv4 } from 'uuid'; // UUID generation

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
// Mark tier as optional here
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'tier'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: UserRole;
  public tier!: UserTier;
  public isVerified!: boolean;
  public passwordResetToken?: string | null;
  public passwordResetTokenExpiry?: Date | null;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Define the model with validation and default values
  static initModel() {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: uuidv4, // Automatically generate UUID for 'id'
          primaryKey: true, // Mark this as the primary key
          allowNull: false, // 'id' cannot be null
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
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: UserRole.User, // Default to 'User' role
          validate: {
            isIn: [['user', 'admin']], // Ensure role is either 'user' or 'admin'
          },
        },
        tier: {
          type: DataTypes.ENUM('free', 'paid'), // Enum for UserTier (with literal values)
          allowNull: false,
          defaultValue: UserTier.Free, // Default to 'free' tier
          validate: {
            isIn: [['free', 'paid']], // Ensures only 'free' or 'paid' are valid values
          },
        },
        isVerified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize, // Pass sequelize instance
        modelName: 'User',
      }
    );
  }
}

// Initialize the model
User.initModel();

// Export UserRole and UserTier so that they are available for other files
export { UserRole, UserTier };
