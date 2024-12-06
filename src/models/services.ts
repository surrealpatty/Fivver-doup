// src/models/services.ts
import { DataTypes, Model } from 'sequelize';
import  sequelize from '../config/database'; // Ensure named import from your config

// Define the Service model class
class Service extends Model {
  id!: number;
  name!: string;
  // Add other fields as needed
}

// Initialize the model
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
    // Add more fields as necessary
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: 'Service', // Specify the model name
    tableName: 'services', // Optional, specify table name if needed
    timestamps: true, // Optional, set to false if you don't want timestamps
  }
);

export default Service;
