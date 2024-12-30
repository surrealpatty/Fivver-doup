// src/models/services.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Ensure this path is correct

// Define the actual attributes of the Service model (includes all fields)
export interface ServiceAttributes {
  id: string;  // Change from number to string for UUID
  title: string;
  description: string;
  price: number;
  userId: string;  // userId type remains string (UUID)
  image?: string;  // Optional image field
}

// Define the attributes for creation where 'id' is optional (it's auto-generated)
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Define the Service model
export class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  id!: string;  // Change from number to string (UUID)
  title!: string;
  description!: string;
  price!: number;
  userId!: string;  // Change userId type to string (UUID)
  image?: string;  // Define image as optional
}

Service.init(
  {
    id: {
      type: DataTypes.UUID,  // Change to UUID type
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,  // Set default value to auto-generate UUIDs
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
      type: DataTypes.STRING,  // userId remains a string (UUID)
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
