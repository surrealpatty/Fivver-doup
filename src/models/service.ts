// src/models/services.ts

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';  // Ensure correct import of User model

interface ServiceAttributes {
  id: number;
  userId: string;
  title: string;
  description: string;
  price: number;
}

// ServiceCreationAttributes allows for creating a Service without the `id`
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public userId!: string;
  public title!: string;
  public description!: string;
  public price!: number;
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize,
    tableName: 'services',
  }
);

Service.belongsTo(User, { foreignKey: 'userId' });

export default Service;
// You no longer need to export 'ServiceCreationAttributes' here.
