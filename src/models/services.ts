import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from 'config/database'; // Correct alias for the sequelize instance

// Service attributes and creation attributes interface
export interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: number;
}

// Service creation attributes - id is optional on creation
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Sequelize Service model class
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public userId!: number;

  // Timestamps (createdAt, updatedAt) are handled automatically by Sequelize, 
  // so no need to define them unless you want custom names.
}

// Initialize the Service model
Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // Reference to the Sequelize instance
    modelName: 'Service', // Name of the model in database
    tableName: 'services', // The table name in the database
    timestamps: true, // Enable timestamps if you want to use createdAt and updatedAt
  }
);

export default Service;  // Default export of the Service model
