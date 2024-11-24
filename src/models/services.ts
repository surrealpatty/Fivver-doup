// src/models/service.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ServiceAttributes {
  id: number;
  userId: number;
  title: string;
  description?: string;
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description?: string;
}

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
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Service',
  }
);

export default Service;  // Correct export
