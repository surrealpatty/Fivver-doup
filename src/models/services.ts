// src/models/services.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Service extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public userId!: number;
}

Service.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'Service' }
);

// Define and export the type for Service creation attributes
export interface ServiceCreationAttributes {
  title: string;
  description: string;
  price: number;
  userId: number;
}

export default Service;
