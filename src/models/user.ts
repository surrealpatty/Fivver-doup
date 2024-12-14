import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Make sure the path is correct

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
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public tier!: string;
  public isVerified!: boolean;
  public passwordResetToken?: string | null;  // Allow null
  public passwordResetTokenExpiry?: Date | null;  // Allow null

  // Static method to associate models (can be added later if needed)
  static associate(models: any) {
    // Define associations here if any, e.g., User.hasMany(models.Order);
  }
}

// Initialize the Sequelize User model
User.init(
  {
    id: {
      type: DataTypes.STRING,  // id as a string (e.g., UUID)
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,  // Ensures that the email column is unique
      allowNull: false,
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
      defaultValue: false,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true, // Can be null
    },
    passwordResetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true, // Can be null
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'User',
    tableName: 'users', // Name of the table in the database
    timestamps: true, // Adjust based on your table schema (if using createdAt, updatedAt)
  }
);
