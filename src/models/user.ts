import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define the attributes required for the User model
interface UserAttributes {
  id: string;               // Change to string to use UUID
  email: string;
  password: string;
  username: string;
  role?: string;
  tier?: string;
  isVerified?: boolean;
  resetToken?: string;
  resetTokenExpiration?: Date;
}

// Define the attributes for creating a new user (id is optional when creating, as Sequelize auto-generates it)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: string;  // Change to string to match the UUID type
  email!: string;
  password!: string;
  username!: string;
  role?: string;
  tier?: string;
  isVerified?: boolean;
  resetToken?: string;
  resetTokenExpiration?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,   // Use UUID type for the id
      primaryKey: true,        // Marks this as the primary key
      defaultValue: DataTypes.UUIDV4, // Use UUIDv4 as the default value for auto-generation
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Ensures that the email is unique
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
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false, // Optional default value for unverified users
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export { User };
