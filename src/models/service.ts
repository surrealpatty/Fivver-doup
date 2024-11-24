// src/models/service.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';  // Import sequelize instance

class Service extends Model {
  public id!: number;
  public name!: string;
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
    name: {
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
    sequelize,
    modelName: 'Service',
    tableName: 'services',
  }
);

export default Service;  // Ensure the default export of Service model
