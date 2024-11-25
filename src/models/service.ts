import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user'; // Assuming this is the User model

// Define the type for the Service model
interface ServiceAttributes {
  id: number;
  userId: string;
  title: string;
  description: string;
  price: number;
}

// Define the type for creating a Service (optional properties are allowed)
export interface ServiceCreationAttributes
  extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes {
  public id!: number;
  public userId!: string;
  public title!: string;
  public description!: string;
  public price!: number;

  // Other model-related methods and associations
}

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

// Associations
Service.belongsTo(User, { foreignKey: 'userId' });

export default Service;
