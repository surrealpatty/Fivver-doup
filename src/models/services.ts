import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Use named import
import User from './user'; // Import the User model

// Define the attributes for the Service model
export interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  userId: number; // Add userId to associate Service with User
}

// Define attributes that are required for creation (make 'id' optional)
export interface ServiceCreationAttributes
  extends Optional<ServiceAttributes, 'id'> {}

// Define the Service model
class Service extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public userId!: number; // Ensure userId is typed

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define static method for associations
  static associate() {
    Service.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user', // Alias for the association
    });
  }
}

// Initialize the model with the correct fields and data types
Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // userId is required to establish the relationship
    },
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services', // Explicitly set the table name
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);

// Export the model
export default Service;
