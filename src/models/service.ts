// src/models/services.ts

import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define attributes for the Service model
export interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: string;
}

// Define creation attributes where 'id' is optional
export type ServiceCreationAttributes = Optional<ServiceAttributes, 'id'>;

// Define the Service model
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public userId!: string;

  static initModel() {
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
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'services',
      }
    );
  }
}

// Initialize the model
Service.initModel();

// Export the model and type separately
export default Service;
export { ServiceCreationAttributes };  // Exporting the type separately

