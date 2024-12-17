// src/models/service.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Ensure this path is correct

// Define the attributes for creating a service (Optional properties)
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {
  title: string;
  description: string;
  price: number;
  userId: number;
}

// Define the actual attributes of the Service model (includes all fields)
interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: number;
}

export class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  id!: number;
  title!: string;
  description!: string;
  price!: number;
  userId!: number;
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
  },
  {
    sequelize,
    modelName: 'Service',
  }
);

export default Service;
