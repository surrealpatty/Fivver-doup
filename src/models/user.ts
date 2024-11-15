import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Use named import

// Define the UserAttributes interface
export interface UserAttributes {
  id?: number; // Optional, as Sequelize will auto-generate the ID
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: string;
  subscriptionStatus: string;
  createdAt?: Date | null; // Allowing null for createdAt as it's auto-generated
  updatedAt?: Date | null; // Allowing null for updatedAt as it's auto-generated
}

// Define the UserCreationAttributes interface (used for creation without the ID)
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public firstName?: string;
  public lastName?: string;
  public role!: string;
  public subscriptionStatus!: string;
  public createdAt!: Date | null;
  public updatedAt!: Date | null;

  // Define associations (if any)
  static associate(models: any) {
    // Example association: User.hasMany(models.Order);
    // You can add associations like this when needed
  }
}

// Initialize the model
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: true, // firstName can be null if not provided
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true, // lastName can be null if not provided
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Free', // Default to 'Free' role if not provided
    },
    subscriptionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Inactive', // Default to 'Inactive' status
    },
  },
  {
    sequelize, // Reference the sequelize instance here
    tableName: 'users', // Define table name
    timestamps: true, // Sequelize automatically handles createdAt and updatedAt
  }
);

export default User;
