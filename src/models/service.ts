// src/models/services.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Sequelize instance
import User from './user'; // Import User model for the relation

// Define the attributes for the Service model
interface ServiceAttributes {
  id: string;
  title: string;
  description: string;
  price: number;
  userId: string;
}

// Define the attributes required for creating a Service instance
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  public id!: string;
  public title!: string;
  public description!: string;
  public price!: number;
  public userId!: string; // foreign key from User model
}

Service.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Auto-generate UUID for id
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
        model: User,  // Reference to the User model
        key: 'id',    // Foreign key (should match User model primary key)
      },
    },
  },
  {
    sequelize,
    tableName: 'services',  // Define the table name in DB
  }
);

export { Service, ServiceCreationAttributes };
