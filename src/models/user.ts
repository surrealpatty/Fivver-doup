import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure this is correctly pointing to your Sequelize instance
import bcrypt from 'bcryptjs';

// Define the attributes of the User model
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: 'Free' | 'Paid';
  subscriptionStatus: 'Inactive' | 'Active';
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the attributes required when creating a User
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  firstName?: string;
  lastName?: string;
  role!: 'Free' | 'Paid';
  subscriptionStatus!: 'Inactive' | 'Active';
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  // Define the associations
  static associate(models: any) {
    // Define the relationship between User and Review (assuming a Review model exists)
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
      onDelete: 'CASCADE',
    });
  }

  // Hash the password before saving it to the database
  static async hashPassword(user: User) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
}

// Initialize the User model with Sequelize
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],  // Username length constraint
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,  // Validate email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100],  // Password length constraint
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('Free', 'Paid'),
      allowNull: false,
      defaultValue: 'Free',
    },
    subscriptionStatus: {
      type: DataTypes.ENUM('Inactive', 'Active'),
      allowNull: false,
      defaultValue: 'Inactive',
    },
    subscriptionStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    subscriptionEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize, // Ensure sequelize instance is passed here
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Automatically adds createdAt and updatedAt
    underscored: true, // Use snake_case for column names
  }
);

// Hook to hash the password before creating or updating a user
User.beforeCreate(User.hashPassword);
User.beforeUpdate(User.hashPassword);

export default User;
