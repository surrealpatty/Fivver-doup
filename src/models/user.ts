import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

interface UserAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  tier: string;
  isVerified: boolean;
  passwordResetToken?: string | null;
  passwordResetTokenExpiry?: Date | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public tier!: string;
  public isVerified!: boolean;
  public passwordResetToken?: string | null;
  public passwordResetTokenExpiry?: Date | null;

  static associate(models: any) {
    // Define associations if any
  }
}

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
      unique: true,  // Ensures email is unique
      allowNull: false,
      validate: {
        isEmail: true, // Validates the email format
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: true,  // Ensures username is unique
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
      defaultValue: false,  // Default to false if not specified
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,  // Can be null if not in use
    },
    passwordResetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,  // Can be null if not in use
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',  // Ensure this matches your table name
    timestamps: true,  // Automatically adds createdAt and updatedAt
    indexes: [
      // Only necessary indexes should be added manually, but we already have unique on email and username
    ],
  }
);

export default User;
