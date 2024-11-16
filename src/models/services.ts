import { Model, DataTypes, Optional, ModelStatic } from 'sequelize';
import { sequelize } from '../config/database'; // Correctly import sequelize instance
import User from './user'; // Import the User model (adjust path as needed)

// Define the attributes for the "services" table
interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  user_id: number | null;  // Nullable user_id to match foreign key relation
  createdAt: Date;
  updatedAt: Date;
}

// Define the optional fields for the "services" table (only for creating instances)
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public user_id!: number | null;  // Make sure user_id is consistently used
  public createdAt!: Date;
  public updatedAt!: Date;

  // Define the associate method to establish relationships
  static associate(models: { User: ModelStatic<Model> }) {
    // Define the association with the User model
    Service.belongsTo(models.User, {
      foreignKey: 'user_id',  // Foreign key is user_id (snake_case to match the column name)
      onDelete: 'SET NULL',    // If the user is deleted, set user_id to NULL in services
      onUpdate: 'CASCADE',     // If the user's id is updated, update user_id in services
    });
  }
}

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
    user_id: {  // Match this with the snake_case column name in the database
      type: DataTypes.INTEGER,
      allowNull: true,  // user_id can be nullable if user is deleted
      references: {
        model: 'users',  // The table name in the database (should be plural if that's how it's named)
        key: 'id',
      },
      onDelete: 'SET NULL',  // If the user is deleted, set user_id to NULL
      onUpdate: 'CASCADE',   // If the user's id is updated, update user_id in services
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: 'Service', // The name of the model
    tableName: 'services', // The table name in the DB
    timestamps: true, // Enable Sequelize's automatic timestamp management
    underscored: true, // Use snake_case for column names, e.g., created_at, updated_at
  }
);

// Ensure associations are set up after model is initialized
Service.associate({ User });

export default Service;
