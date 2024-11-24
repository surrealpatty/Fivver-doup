// src/models/service.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Service extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public userId!: number;
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
      type: DataTypes.STRING,
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
    sequelize,  // Important! Ensure the sequelize instance is passed in here
    tableName: 'services',  // Name of the table
  }
);

export default Service;
