// src/models/services.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define ServiceAttributes
export interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
}

// Define ServiceCreationAttributes (for creating new instances)
export interface ServiceCreationAttributes
  extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  static associate(models: any) {
    Service.belongsToMany(models.User, { through: 'UserServices' });
  }
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
  },
  {
    sequelize,
    modelName: 'Service',
  }
);

export default Service;
