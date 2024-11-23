// src/models/services.ts

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';  // Correct imports from Sequelize
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
      type: DataTypes.INTEGER,  // Correct usage of DataTypes
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
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
