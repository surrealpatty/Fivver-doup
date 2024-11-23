// src/models/services.ts

import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database'; // Assuming sequelize instance is correctly exported

// Define the Service model
class Service extends Model {
  public id!: number;
  public userId!: string;
  public description!: string;
  public price!: number;
}

// Initialize the Service model
Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
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
    sequelize, // Pass the Sequelize instance
    tableName: 'services', // Specify the table name
    modelName: 'Service',  // Specify the model name
  }
);

export default Service;
