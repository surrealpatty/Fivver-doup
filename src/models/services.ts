// src/models/services.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';

// Define the Service attributes (what data the Service model will store)
interface ServiceAttributes {
  id: number;
  title: string;  // Change 'name' to 'title' as per your model
  description: string;
  price: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Service creation attributes (used when creating new instances, and exclude 'id' field as it's auto-generated)
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Service class definition
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public userId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Service model
Service.init(
  {
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
        model: User,  // Foreign key reference to User model
        key: 'id',    // User model's id field
      },
    },
  },
  {
    sequelize,
    modelName: 'Service',  // Model name
    tableName: 'services',  // Optional: Set the actual table name in DB
    timestamps: true,       // Optional: Ensures Sequelize tracks createdAt/updatedAt
  }
);

export default Service;
