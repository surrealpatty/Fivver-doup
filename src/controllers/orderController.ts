import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Service extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public userId!: number;

  // Define any additional methods or getters here
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
    sequelize, // Pass the Sequelize instance
    modelName: 'Service',
  }
);

export default Service;
