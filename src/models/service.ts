// src/models/service.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

// Define the Service model
export class Service extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  // other fields...
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // other fields...
  },
  {
    sequelize,
    tableName: 'services',  // Specify the table name
  }
);

export default Service;
