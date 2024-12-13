// src/models/services.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@config/database'; // Ensure the sequelize import is correct

// Define the ServiceAttributes interface
export interface ServiceAttributes {
  id: number;  // id as number (based on your model definition)
  name: string;
  description: string;
  price: number;
  userId: number;  // userId as number (based on your model definition)
  image?: string;
}

// Define the Service model class
class Service extends Model<ServiceAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public userId!: number;
  public image?: string;
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
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, // Sequelize instance
    tableName: 'services',
  }
);

// Export the model and interface
export default Service;  // Default export
