import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Correct import for sequelize instance

// Define the attributes for the Service model
interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes (all attributes except `id` are optional)
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

// Initialize the model
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
    sequelize, // Make sure sequelize is passed correctly
    modelName: 'Service',
    tableName: 'services', // This should match your table name in the database
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
    underscored: true, // If you want column names to be snake_case (optional)
  }
);

export default Service;
