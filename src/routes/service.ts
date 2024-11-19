import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';  // Ensure this imports the default sequelize instance

// Define the attributes for the Service model
interface ServiceAttributes {
  id: number;
  userId: number;
  title: string;
  description: string;
  price: number;
}

// Define creation attributes (this is used for creating new records)
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Define the Service model
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public price!: number;

  // Timestamps (if you have createdAt and updatedAt columns in your model)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Service model with Sequelize
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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the sequelize instance
    tableName: 'services', // Specify the table name (optional if different from model name)
  }
);

// Export the Service model as default
export default Service;
