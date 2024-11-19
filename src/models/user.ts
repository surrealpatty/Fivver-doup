import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure the correct path
import Review from './review'; // Import related models
import Order from './order'; // Import related models
import { Service } from './services';

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
  static associate(models: any) {
    // A user can have many reviews
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews', // Alias for the associated model
    });

    // A user can have many orders
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders', // Alias for the associated model
    });

    // A user can have many services (if applicable)
    User.hasMany(models.Service, {
      foreignKey: 'userId',
      as: 'services', // Alias for the associated model
    });
  }
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
      defaultValue: false, // Default to false if not provided
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user', // Default to 'user' if not provided
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    tableName: 'users', // Adjust if your table name differs
    modelName: 'User',
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);

// Dynamically associate models with the sequelize instance after defining them
User.associate({ Review, Order, Service });

export default User;
