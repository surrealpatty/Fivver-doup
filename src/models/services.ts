import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Import the sequelize instance from config

// Service attributes interface
export interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: number;
}

// Service creation attributes - id is optional on creation
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Sequelize Service model class
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public userId!: number;

  // Timestamps (createdAt, updatedAt) are handled automatically by Sequelize
  // No need to define them unless you want custom names or additional fields
}

// Initialize the Service model using Sequelize's `init` method
Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure the title is not null
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false, // Ensure the description is not null
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false, // Ensure price is not null
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ensure userId is not null
    },
  },
  {
    sequelize, // Pass the Sequelize instance to initialize the model
    modelName: 'Service', // The name of the model in the database
    tableName: 'services', // The name of the table in the database
    timestamps: true, // Enable timestamps if you want createdAt and updatedAt fields
  }
);

export default Service;  // Export the Service model as the default export
