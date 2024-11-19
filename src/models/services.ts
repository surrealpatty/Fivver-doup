// src/models/service.ts

import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Make sure this points to your Sequelize instance

// Define attributes for the Service model
interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes (id is optional for creation)
type ServiceCreationAttributes = Optional<ServiceAttributes, 'id'>;

// Define the Service model class
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Service model
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
  },
  {
    sequelize, // Pass the sequelize instance here
    modelName: 'Service',  // Make sure this matches the table name
    tableName: 'services', // Ensure this is the name of your table
    timestamps: true, // Sequelize will automatically manage createdAt and updatedAt fields
  }
);

export default Service;
