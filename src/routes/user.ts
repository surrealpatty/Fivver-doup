import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface UserAttributes {
  id: string;
  email: string;
  password: string;
  username: string;
  role?: string;
  tier?: string;
  isVerified?: boolean;
  passwordResetToken?: string | null; // Add this
  passwordResetTokenExpiry?: Date | null; // Add this
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public username!: string;
  public role?: string;
  public tier?: string;
  public isVerified?: boolean;
  public passwordResetToken?: string | null; // Add this
  public passwordResetTokenExpiry?: Date | null; // Add this
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'free',
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'free',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    passwordResetToken: {
      type: DataTypes.STRING, // Add this field
      allowNull: true,
    },
    passwordResetTokenExpiry: {
      type: DataTypes.DATE, // Add this field
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

export { User };
export const userRoutes = /* Your user routes setup */;
