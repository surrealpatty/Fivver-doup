// src/models/services.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Ensure this path is correct

// Define the actual attributes of the Service model (includes all fields)
export interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: number;
  image?: string;  // Add image property (optional)
}

// Define the attributes for creation where 'id' is optional (it's auto-generated)
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Define the Service model
export class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  id!: number;
  title!: string;
  description!: string;
  price!: number;
  userId!: number;
  image?: string;  // Define image as optional
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,  // Define 'image' as a string (could be URL or file path)
      allowNull: true,  // Allow image to be optional
    },
  },
  {
    sequelize,
    modelName: 'Service',
  }
);

export default Service;
