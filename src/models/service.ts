import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './user'; // Correct named import for User model

// Define the interface for Service attributes
interface ServiceAttributes {
  id: number;
  userId: string;
  title: string;
  description: string;
  price: number;
}

// Define the interface for Service creation attributes (without the 'id' field)
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Define the Service model class
class Service
  extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes
{
  public id!: number;
  public userId!: string;
  public title!: string;
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
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
  }
);

// Define the relationship with the User model
Service.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { Service, ServiceAttributes, ServiceCreationAttributes };
