import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Correct path to sequelize instance
import { v4 as uuidv4 } from 'uuid'; // Import UUID generation for `id`
import Review from './review'; // Import the Review model
import Order from './order'; // Import the Order model
import Service from './services'; // Import the Service model

// Define the attributes for the User model
interface UserAttributes {
  id: string; // UUID instead of integer
  email: string;
  username: string;
  password: string;
  isPaid: boolean;
  role?: string; // Optional field for user role
}

// Optional attributes for User creation (id is auto-generated)
type UserCreationAttributes = Optional<UserAttributes, 'id'>;

// Extend Sequelize's Model with your custom attributes
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string; // UUID as string
  public email!: string;
  public username!: string;
  public password!: string;
  public isPaid!: boolean;
  public role?: string;

  // Add timestamps if using them
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations after the model is defined
  static associate() {
    // A user can have many reviews
    User.hasMany(Review, {
      foreignKey: 'userId',
      as: 'reviews', // Alias for the associated model
    });

    // A user can have many orders
    User.hasMany(Order, {
      foreignKey: 'userId',
      as: 'orders', // Alias for the associated model
    });

    // A user can have many services
    User.hasMany(Service, {
      foreignKey: 'userId',
      as: 'services', // Alias for the associated model
    });
  }
}

// Initialize the model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4, // Generate a UUID by default
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
User.associate();

export default User;
