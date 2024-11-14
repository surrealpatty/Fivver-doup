import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure sequelize is properly imported

// Define the attributes interface for the Service model
interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Service model class
class Service extends Model<ServiceAttributes> implements ServiceAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public category!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations for Service
  static associate(models: any) {
    // Example association: A service can have many orders
    Service.hasMany(models.Order, { foreignKey: 'serviceId', as: 'orders' });
    // Add more associations as needed
  }
}

// Initialize the Service model
Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'Title must be between 3 and 100 characters long',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description cannot be empty',
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'Price must be a valid number',
        },
        min: {
          args: [0],
          msg: 'Price must be greater than or equal to zero',
        },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Category cannot be empty',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true,
    underscored: true, // Use snake_case for column names in the database
  }
);

export default Service;
