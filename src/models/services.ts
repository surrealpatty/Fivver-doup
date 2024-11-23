// src/models/services.ts

import * as DataTypes from 'sequelize';  // Importing DataTypes in this manner
import { sequelize } from '../config/database';  // Correct import path for sequelize instance

// Define the attributes for the Service model
export interface ServiceAttributes {
  id: number;
  userId: string;
  title: string;
  description?: string;
  price: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public userId!: string;
  public title!: string;
  public description?: string;
  public price!: number;
  public category!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Service.init(
  {
    id: {
      type: DataTypes.DataTypes.INTEGER,  // Correct usage of DataTypes when imported this way
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true,
  }
);

export default Service;
