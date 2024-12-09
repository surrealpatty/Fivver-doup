// src/models/services.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Assuming sequelize is properly initialized

// Define the interface for the attributes used to create a Service (without the primary key)
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {
  name: string;
  description: string;
  price: number;
  image?: string;
  userId: string;  // Change userId type to string to match User model
}

// Define the interface for the attributes of a Service (including the primary key)
export interface ServiceAttributes {
  id: string;  // Change id type to string to align with User model's id
  userId: string;  // Change userId type to string to match User model
  name: string;
  description: string;
  price: number;
  image?: string;
}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  id!: string;  // Change id type to string
  userId!: string;  // Change userId type to string
  name!: string;
  description!: string;
  price!: number;
  image?: string;  // Add image property
}

Service.init(
  {
    id: {
      type: DataTypes.STRING,  // Change id type to string
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,  // Using UUID for auto-generated id
    },
    userId: {
      type: DataTypes.STRING,  // Change userId type to string
      allowNull: false,
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
    image: {
      type: DataTypes.STRING,  // Add image field (optional)
    },
  },
  {
    sequelize,
    modelName: 'Service',
  }
);

export default Service;
