// src/models/service.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Service extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
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
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true,
    underscored: true,
  }
);

export default Service;
