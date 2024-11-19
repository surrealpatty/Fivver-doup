// src/models/service.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define the attributes for Service
export interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
}

// Define attributes that are required for creation (optional 'id')
export interface ServiceCreationAttributes
  extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  // Static method findByPk should be available here
  static associate(models: any) {
    // Define associations, if needed
    // Example: Service.belongsTo(models.User);
  }
}

// Initialize the model with the correct fields and data types
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Service', // Table name will be 'Services' (pluralized automatically)
  }
);

export default Service;
