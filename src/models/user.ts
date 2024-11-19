import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure the correct path

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  email: string;
  username: string;
  password: string;
  isPaid: boolean;
  role?: string; // Optional field
}

// Optional attributes for User creation (id is auto-incremented)
type UserCreationAttributes = Optional<UserAttributes, 'id'>;

// Extend Sequelize's Model with your custom attributes
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public username!: string;
  public password!: string;
  public isPaid!: boolean;
  public role?: string;

  // Add timestamps if using them
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define any instance-level methods here if needed
}

// Initialize the model
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    tableName: 'users', // Adjust if your table name differs
    modelName: 'User',
  }
);

export default User;
