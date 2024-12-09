import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define the interface for the attributes used to create a User (without the primary key)
export interface UserCreationAttributes extends Optional<Omit<UserAttributes, 'id'>, 'isVerified'> {
  email: string;
  username: string;
  password: string;
  role: string;
  tier: string;
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
  public isVerified!: boolean;  // Add isVerified to the model
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

export { User, UserAttributes, UserCreationAttributes };
