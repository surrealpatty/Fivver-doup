import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Correct import for sequelize

// Define the UserAttributes interface with subscription fields
export interface UserAttributes {
  id?: number; // Optional because Sequelize auto-generates the ID
  username: string;
  email: string;
  password: string;
  firstName?: string | null; // Allow null for optional fields
  lastName?: string | null;
  role: 'Free' | 'Paid'; // Restrict role to 'Free' or 'Paid' only
  subscriptionStatus: 'Active' | 'Inactive'; // Restrict subscriptionStatus to 'Active' or 'Inactive'
  subscriptionStartDate?: Date | null;  // Optional field for subscription start date
  subscriptionEndDate?: Date | null;    // Optional field for subscription end date
  createdAt?: Date | null; // Auto-generated by Sequelize
  updatedAt?: Date | null; // Auto-generated by Sequelize
}

// Define the UserCreationAttributes interface for creating a user without an ID
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public firstName!: string | null;
  public lastName!: string | null;
  public role!: 'Free' | 'Paid';  // Restrict role values
  public subscriptionStatus!: 'Active' | 'Inactive';  // Restrict subscription status values
  public subscriptionStartDate!: Date | null;
  public subscriptionEndDate!: Date | null;
  public createdAt!: Date | null;
  public updatedAt!: Date | null;

  // Define associations (if needed)
  static associate(models: any) {
    // Example associations, uncomment as needed:
    // User.hasMany(models.Order); // if User has many Orders
    // User.belongsTo(models.Role); // if User belongs to Role
  }
}

// Initialize the User model
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure the username is unique
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure the email is unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null for firstName
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null for lastName
    },
    role: {
      type: DataTypes.ENUM('Free', 'Paid'), // Restrict role to 'Free' or 'Paid'
      allowNull: false,
      defaultValue: 'Free', // Default role to 'Free'
    },
    subscriptionStatus: {
      type: DataTypes.ENUM('Active', 'Inactive'), // Restrict subscriptionStatus to 'Active' or 'Inactive'
      allowNull: false,
      defaultValue: 'Inactive', // Default subscription status to 'Inactive'
    },
    subscriptionStartDate: {
      type: DataTypes.DATE,
      allowNull: true,  // Allow null if not yet set
    },
    subscriptionEndDate: {
      type: DataTypes.DATE,
      allowNull: true,  // Allow null if not yet set
    },
  },
  {
    sequelize, // Pass the sequelize instance
    tableName: 'users', // Specify the table name
    timestamps: true, // Enable Sequelize to handle createdAt and updatedAt
    createdAt: 'created_at', // Map Sequelize's createdAt to 'created_at' column
    updatedAt: 'updated_at', // Map Sequelize's updatedAt to 'updated_at' column
    underscored: true, // Use snake_case for column names (e.g., `created_at`)
  }
);

export default User;
