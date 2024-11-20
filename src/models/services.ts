// src/models/services.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';

class Service extends Model {
  public id!: number;
  public title!: string;  // Change 'name' to 'title'
  public description!: string;
  public price!: number;
  public userId!: number;
}

Service.init(
  {
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
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Service',
  }
);

export default Service;
