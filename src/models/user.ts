import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

// Define the UserAttributes interface to specify the attributes of the User model
interface UserAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  tier: string;
  isVerified: boolean;
  resetToken?: string;
  resetTokenExpiration?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the UserCreationAttributes interface
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'resetToken' | 'resetTokenExpiration'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public tier!: string;
  public isVerified!: boolean;
  public resetToken?: string;
  public resetTokenExpiration?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // This automatically adds a unique constraint on the email column
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
      defaultValue: 'user',
    },
    tier: {
      type: DataTypes.STRING,
      defaultValue: 'free',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    tableName: 'users',
    timestamps: true,
    // No need to define indexes manually unless you need a custom index
  }
);

export { User, UserAttributes, UserCreationAttributes };
