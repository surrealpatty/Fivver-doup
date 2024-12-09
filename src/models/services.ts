// src/models/services.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';  // Assuming sequelize is properly initialized

class Service extends Model {
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
