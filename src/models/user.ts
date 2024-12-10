// src/models/user.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcryptjs';  // Import bcrypt to hash the password

// Define the interface for the attributes used to create a User (without the primary key)
export interface UserCreationAttributes extends Optional<Omit<UserAttributes, 'id'>, 'isVerified'> {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  tier: "free" | "paid";
  isVerified?: boolean;  // Optional during creation
}

// Define the interface for the attributes of a User (including the primary key)
export interface UserAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  tier: string;
  isVerified: boolean;  // Make isVerified non-optional
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public tier!: string;
  public isVerified!: boolean;

  // Define a static method to hash the password
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,  // Default value for isVerified
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

// Only export the User class, avoiding export conflicts
export { User };
