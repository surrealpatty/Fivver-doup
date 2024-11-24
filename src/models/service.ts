// src/models/services.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user'; // Import the User model

interface ServiceAttributes {
  id: string;
  title: string;
  description: string;
  price: number;
  userId: string; // Make sure 'userId' is defined here
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  public id!: string;
  public title!: string;
  public description!: string;
  public price!: number;
  public userId!: string; // Correctly define 'userId' here
}

Service.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,  // Reference to User model
        key: 'id',    // Ensure this is the primary key of the User model
      },
    },
  },
  {
    sequelize,
    tableName: 'services',  // Ensure this matches your table name
  }
);

export default Service;
