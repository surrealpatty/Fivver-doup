// src/models/service.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';  // Correct import of User model

// Define the interface for Service attributes
interface ServiceAttributes {
  id: number;
  userId: string;
  title: string;
  description: string;
  price: number;
}

// ServiceCreationAttributes interface is for when creating a new service (without the 'id' field)
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Define the Service model class
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public userId!: string;
  public title!: string;
  public description!: string;
  public price!: number;
}

// Initialize the Service model
Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
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
    sequelize,
    tableName: 'services',
  }
);

// Define the relationship with the User model
Service.belongsTo(User, { foreignKey: 'userId' });

// Export the Service class and ServiceCreationAttributes interface together
export { Service, ServiceCreationAttributes };
