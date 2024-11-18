import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure this import path is correct
import User from './user'; // Import the User model for association

// Define the attributes for the Service model
interface ServiceAttributes {
  id: number;
  userId: string; // Updated to string for UUID reference
  title: string;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// These are the attributes that can be passed when creating a new service (excluding 'id' as it's auto-incremented)
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Define the Service model
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public userId!: string; // Updated to string for UUID reference
  public title!: string;
  public description!: string;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Optionally, you can define associations here if needed later (e.g., User-Services relationship)
}

// Initialize the Service model
Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID, // Use UUID here to match the User model's id type
      allowNull: false,
      references: {
        model: 'users', // The referenced model name for foreign key relationship (ensure this matches the table name in the DB)
        key: 'id',
      },
      onDelete: 'CASCADE', // Optional: delete services if the associated user is deleted
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
      type: DataTypes.DECIMAL(10, 2), // Precision for price
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'services', // Ensure this matches your table name in the DB
    underscored: true, // Optional: If you want snake_case column names
    timestamps: true, // Ensure Sequelize handles createdAt and updatedAt
  }
);

// Define associations here, such as:
Service.belongsTo(User, {
  foreignKey: 'userId',  // User ID in Service model
  as: 'user',            // Alias for association
});

export default Service;
