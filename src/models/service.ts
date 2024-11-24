import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define the attributes for the Service model
export interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: number;
}

// Define the creation attributes, omitting 'id' for creation
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Define the Service model as a named export
export class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public title!: string;
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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Foreign key relationship with users
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'services',
  }
);

// Export both the Service model and ServiceCreationAttributes interface as named exports
export { Service, ServiceCreationAttributes };
