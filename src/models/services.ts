import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@config/database'; // Ensure the sequelize import is correct

// Define the Service model
class Service extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public userId!: number;
}

// Initialize the Service model
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
      type: DataTypes.TEXT,
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
    sequelize, // Sequelize instance
    tableName: 'services',
  }
);

export default Service;  // Default export
