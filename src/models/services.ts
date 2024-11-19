import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Use named import for sequelize

// Define the attributes of the Service model
interface ServiceAttributes {
  id: number;
  userId: number;
  title: string;
  description: string;
  price: number;
}

// Define the attributes for creating a Service (without the 'id' field)
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Create the Service class, extending Sequelize's Model class
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public price!: number;

  // Define associations if needed (e.g., User association)
  static associate(models: any) {
    // Example association: A service belongs to a user
    Service.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

// Initialize the Service model with column definitions
Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize, // Use the named import 'sequelize'
    modelName: 'Service',
    tableName: 'services',
    timestamps: true, // Optionally, you can enable timestamps if needed (createdAt, updatedAt)
  }
);

export default Service;
