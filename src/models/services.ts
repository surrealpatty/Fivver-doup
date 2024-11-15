import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define the ServiceAttributes interface
export interface ServiceAttributes {
  id?: number; // Optional, as Sequelize will auto-generate the ID
  name: string;
  description: string;
  createdAt?: Date | null; // Allowing null for createdAt as it's auto-generated
  updatedAt?: Date | null; // Allowing null for updatedAt as it's auto-generated
}

// Define the ServiceCreationAttributes interface (used for creation without the ID)
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Define the Service model class
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public createdAt!: Date | null;
  public updatedAt!: Date | null;

  // Define associations here, if needed
  static associate(models: any) {
    // Example: Service.belongsTo(models.User); // If a service belongs to a user
  }
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
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true, // Sequelize will handle createdAt and updatedAt
    underscored: true, // Use snake_case for column names
  }
);

export default Service;
