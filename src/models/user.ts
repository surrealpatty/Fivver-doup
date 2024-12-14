import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define the attributes for the User model
interface UserAttributes {
  id: string; // UUID as string
  email: string;
  password: string;
  username: string;
  role?: string; // Optional
  tier?: string; // Optional
  isVerified?: boolean; // Optional
  resetToken?: string | null; // Optional
  resetTokenExpiration?: Date | null; // Optional
}

// Attributes for creating a new user (id is optional because Sequelize auto-generates it)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string; // UUID
  public email!: string;
  public password!: string;
  public username!: string;
  public role?: string; // Optional
  public tier?: string; // Optional
  public isVerified?: boolean; // Optional
  public resetToken?: string | null; // Optional
  public resetTokenExpiration?: Date | null; // Optional
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.UUID, // UUID type
      primaryKey: true, // Primary key
      defaultValue: DataTypes.UUIDV4, // Auto-generate UUIDv4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure email is unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'free', // Default role
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'free', // Default tier
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false, // Default to not verified
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true, // Nullable
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true, // Nullable
    },
  },
  {
    sequelize,
    modelName: 'User', // Model name
    tableName: 'users', // Table name in the database
  }
);

export { User };
