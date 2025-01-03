import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Correct import

// Define the interface for the attributes used to create a Service (without the primary key)
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {
  name: string;
  description: string;
  price: number;
  image?: string;
  userId: number;
}

// Define the interface for the attributes of a Service (including the primary key)
export interface ServiceAttributes {
  id: number;
  userId: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  id!: number;
  userId!: number;
  name!: string;
  description!: string;
  price!: number;
  image?: string; // Add image property to your model
}

Service.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING }, // Make sure this matches your DB schema
  },
  {
    sequelize,
    modelName: 'Service',
  }
);

export default Service;
