import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Use default import if sequelize is exported as default

class Service extends Model {
  // You can add associations here if needed
  static associate(models) {
    // Example: Service.hasMany(models.Review, { foreignKey: 'serviceId', as: 'reviews' });
  }
}

// Initialize the Service model
Service.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],  // Enforce length between 3 and 100 characters
          msg: 'Title must be between 3 and 100 characters long',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description cannot be empty',  // Ensure description is provided
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'Price must be a valid number',  // Validate price as a float
        },
        min: {
          args: [0],
          msg: 'Price must be greater than or equal to zero',  // Ensure price is non-negative
        },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Category cannot be empty',  // Ensure category is provided
        },
      },
    },
  },
  {
    sequelize,             // Pass sequelize instance here
    modelName: 'Service',  // Use the name 'Service'
    tableName: 'services', // Table name in the database
    timestamps: true,      // Automatically add createdAt and updatedAt columns
    underscored: true,     // Use snake_case for database column names
  }
);

export default Service;
