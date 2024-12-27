import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user'; // Correct named import for User model

// Define the interface for Service attributes
interface ServiceAttributes {
  id: number;
  userId: number; // userId should be a number, matching the type of User's id
  title: string;
  description: string;
  price: number;
  createdAt?: Date; // Optional because Sequelize manages timestamps
  updatedAt?: Date; // Optional because Sequelize manages timestamps
}

// Define the interface for Service creation attributes (without the 'id' field)
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Define the Service model class
class Service
  extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes
{
  public id!: number;
  public userId!: number; // Ensure userId is a number
  public title!: string;
  public description!: string;
  public price!: number;

  // These fields are automatically managed by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Service model
Service.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED, // Make sure this matches User's id type
      allowNull: false,
      references: {
        model: User, // References the User model
        key: 'id', // Refers to User's primary key
      },
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
    modelName: 'Service', // Model name
    tableName: 'services', // Table name
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Define the relationship with the User model
Service.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // Service has a user (belongsTo)
User.hasMany(Service, { foreignKey: 'userId', as: 'services' }); // User can have many services (hasMany)

// Export the Service model and types
export { Service, ServiceAttributes, ServiceCreationAttributes };
