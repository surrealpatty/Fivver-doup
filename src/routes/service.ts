// src/models/service.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';  // Correct the path if needed

export class Service extends Model {
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

export default Service;  // Ensure Service is exported properly
