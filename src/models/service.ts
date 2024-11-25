// src/models/services.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';  // Adjust path if needed

interface ServiceCreationAttributes {
  title: string;
  description: string;
  price: number;
  userId: string;
}

class Service extends Model<ServiceCreationAttributes> implements ServiceCreationAttributes {
  public title!: string;
  public description!: string;
  public price!: number;
  public userId!: string;
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
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Service',
  }
);

export default Service;
export { ServiceCreationAttributes };
