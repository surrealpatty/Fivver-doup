import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Correct import for sequelize instance

// Define attributes for the Service model
interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes (all fields except `id` are optional)
type ServiceCreationAttributes = Optional<ServiceAttributes, 'id'>;

class Service
  extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0,
      },
    },
  },
  {
    sequelize, // Sequelize instance
    modelName: 'Service', // Model name
    tableName: 'services', // Table name in the database
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    underscored: true, // Converts camelCase to snake_case for database columns
  }
);

export default Service;
