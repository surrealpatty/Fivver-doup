// src/models/services.ts

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';  // Correct imports from Sequelize
import { sequelize } from '../config/database';  // Correct import path for sequelize

// Define the attributes for the Service model
export interface ServiceAttributes {
  id: number;  // `id` is of type number (auto-incremented)
  userId: string;  // Assuming the user ID is of type UUID (adjust if different)
  title: string;
  description?: string;  // Optional field for description
  price: number;  // Price field
  category: string;  // Category field for service classification
}

// Define the creation attributes for the Service model
// `id` is optional during creation, since it's auto-incremented
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Define the Service model
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public userId!: string;
  public title!: string;
  public description?: string;
  public price!: number;
  public category!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Add any additional instance methods or hooks here if necessary
}

// Initialize the model
Service.init(
  {
    id: {
      type: DataTypes.INTEGER,  // Use INTEGER for auto-incrementing ID
      autoIncrement: true,  // Automatically increments for each new service
      primaryKey: true,  // Set as the primary key for the table
    },
    userId: {
      type: DataTypes.UUID,  // Assuming the userId is UUID type
      allowNull: false,  // Cannot be null, as it is a foreign key
    },
    title: {
      type: DataTypes.STRING,  // Title of the service
      allowNull: false,  // Title is required
    },
    description: {
      type: DataTypes.TEXT,  // Description of the service, optional field
      allowNull: true,  // Allow null values for optional description
    },
    price: {
      type: DataTypes.FLOAT,  // Price field to store the service price
      allowNull: false,  // Price is required
    },
    category: {
      type: DataTypes.STRING,  // Category field for the service
      allowNull: false,  // Category is required
    },
  },
  {
    sequelize,  // Pass the sequelize instance from the config
    modelName: 'Service',  // Model name
    tableName: 'services',  // Corresponding table in the database
    timestamps: true,  // Enable automatic `createdAt` and `updatedAt` fields
  }
);

export default Service;  // Ensure the Service model is exported correctly
