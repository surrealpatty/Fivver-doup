// src/models/services.ts
import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';  // Make sure sequelize instance is correctly imported

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
  },
  {
    sequelize,
    modelName: 'Service',
  }
);

export default Service;  // Default export
