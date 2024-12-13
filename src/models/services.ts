// src/models/services.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  userId: string;
  image?: string | null;  // Allow 'null' for the image field
}

export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {
  // 'id' is optional during creation since it's auto-generated
}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public userId!: string;
  public image?: string | null;  // Allow 'null' for image field

  // Other model methods...
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,  // Mark as the primary key
      autoIncrement: true,  // Automatically increment the value
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,  // Allow null for the image field
    },
  },
  {
    sequelize,
    modelName: 'Service',
  }
);

export default Service;
