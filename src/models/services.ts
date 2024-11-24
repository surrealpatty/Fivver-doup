// src/models/services.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define ServiceAttributes interface for typing
interface ServiceAttributes {
  id: number;
  userId: number;
  title: string;
  description?: string;
}

// ServiceCreationAttributes allows for optional fields during creation
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Define the model class
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description?: string;
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    },
  },
  {
    sequelize, // pass the sequelize instance
    modelName: 'Service', // model name
  }
);

// **Correct approach:** Only export once (default or named export)

// Exporting as default
export default Service;

// Alternatively, you could use a named export (but not both):
// export { Service };
