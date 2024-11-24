import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';  // Import the User model to define the foreign key

// Define the attributes for Service model
interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: number;  // Foreign key to User model
}

// Optional attributes for creating a Service instance
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public userId!: number;  // Foreign key for User
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      references: {
        model: User,  // The User model this refers to
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Service',
  }
);

export default Service;  // Default export for Service model
