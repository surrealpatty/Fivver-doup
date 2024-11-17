import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Correctly import sequelize instance
import Service from './service'; // Import the Service model

// Define the attributes for the "users" table
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string; // 'Free' or 'Paid'
  subscriptionStatus: string; // 'Active' or 'Inactive'
  subscriptionStartDate: Date;
  subscriptionEndDate: Date;
  createdAt?: Date; // Optional for TypeScript as Sequelize will auto-manage these
  updatedAt?: Date; // Optional for TypeScript as Sequelize will auto-manage these
}

// Define the optional fields for creating instances
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string; // Default 'Free' or 'Paid'
  public subscriptionStatus!: string; // Default 'Active' or 'Inactive'
  public subscriptionStartDate!: Date;
  public subscriptionEndDate!: Date;
  public createdAt?: Date;
  public updatedAt?: Date;

  // Define the associate method to establish relationships
  static associate(models: any) {
    // Define the association with the Service model
    User.hasMany(models.Service, {
      foreignKey: 'user_id', // Foreign key on the Service model
      onDelete: 'CASCADE', // Delete services when the user is deleted
      onUpdate: 'CASCADE', // Update user_id when the user is updated
    });
  }
}

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
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Free', // Default to 'Free' role
    },
    subscriptionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Inactive', // Default to 'Inactive' status
    },
    subscriptionStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    subscriptionEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: 'User', // The name of the model
    tableName: 'users', // The table name in the database
    timestamps: true, // Automatically add createdAt and updatedAt fields
    underscored: true, // Use snake_case for column names
  }
);

// Export the model
export default User;
