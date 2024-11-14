import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure correct path to your sequelize instance

// Define the User attributes
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'Free' | 'Paid';
  subscriptionStatus: 'Inactive' | 'Active';
  subscriptionStartDate: Date | null;
  subscriptionEndDate: Date | null;
  firstName: string | null;
  lastName: string | null;
  createdAt?: Date; // Sequelize will auto-generate this field
  updatedAt?: Date; // Sequelize will auto-generate this field
}

// Attributes used for creating a user (excluding 'id' which is auto-generated)
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// User model definition
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: 'Free' | 'Paid';
  public subscriptionStatus!: 'Inactive' | 'Active';
  public subscriptionStartDate!: Date | null;
  public subscriptionEndDate!: Date | null;
  public firstName!: string | null;
  public lastName!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  static associate(models: any) {
    // A user has many services (1-to-many relationship)
    User.hasMany(models.Service, { foreignKey: 'userId', as: 'services' });
  }
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'last_name', // Ensure the correct column name is used in the DB
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Ensure sequelize instance is passed correctly
    modelName: 'User',
    tableName: 'users',
    timestamps: true,  // Sequelize will manage 'createdAt' and 'updatedAt'
    underscored: true, // Use snake_case for column names in the database
  }
);

export default User;
