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
  tier: string;
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
  public tier!: string;
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
      unique: true,  // This adds a unique constraint
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
      defaultValue: false, // Default to false
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
