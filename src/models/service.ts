import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure sequelize is imported correctly

// Define the Service model
export class Service extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the type for creating a new service
export interface ServiceCreationAttributes extends Optional<Service, 'id'> {}

Service.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  {
    sequelize,  // Database connection
    modelName: 'Service',  // Name of the model
    tableName: 'services', // Table name in the DB
  }
);

