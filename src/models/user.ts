import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database'; // Correct import

// Define the attributes of the User model
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role?: 'free' | 'paid'; // Role can be 'free' or 'paid'
  createdAt?: Date; // Optional because Sequelize manages timestamps
  updatedAt?: Date; // Optional because Sequelize manages timestamps
}

// Define the attributes required for creating a new User
export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Define the User model class
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role?: 'free' | 'paid'; // Role field can be free or paid

  // These fields are automatically managed by Sequelize, hence read-only
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
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
    role: {
      type: DataTypes.ENUM('free', 'paid'), // Define role options as ENUM
      defaultValue: 'free', // Default to 'free' if not provided
      allowNull: false, // Role must be specified
    },
  },
  {
    sequelize, // Sequelize instance passed here
    modelName: 'User', // Model name
    tableName: 'users', // Table name in the database
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Export the User model for use in other files
export { User };
