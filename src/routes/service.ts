// src/models/service.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure this import path is correct

interface ServiceAttributes {
  id: number;
  userId: number;
  title: string;
  description: string;
  price: number;
}

class Service extends Model<ServiceAttributes> implements ServiceAttributes {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public price!: number;

  // Timestamps (optional depending on your table setup)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'services',
  }
);

export default Service;
