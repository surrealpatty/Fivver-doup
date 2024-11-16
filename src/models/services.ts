import { Model, DataTypes, Optional, Sequelize, ModelStatic } from 'sequelize';
import { sequelize } from '../config/database'; // Correct way to import a named export
import User from './user'; // Ensure you import the User model (adjust path as needed)

// Define the attributes for the "services" table.
interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  user_id: number | null;  // Use user_id to match the column name in snake_case
  createdAt: Date;
  updatedAt: Date;
}

// Define the optional fields for the "services" table (these are only for creating instances, not for database records).
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public user_id!: number | null;  // Make sure user_id is used consistently
  public createdAt!: Date;
  public updatedAt!: Date;

  // Define the associate method to establish relationships
  static associate(models: { User: ModelStatic<Model> }) {
    // Define the association with the User model
    Service.belongsTo(models.User, {
      foreignKey: 'user_id',  // The foreign key should be snake_case to match the column name
      onDelete: 'SET NULL',    // If the user is deleted, set user_id to NULL in services
      onUpdate: 'CASCADE',     // If the user's id is updated, update the user_id in services
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
    user_id: {  // Match this with the snake_case column name
      type: DataTypes.INTEGER,
      allowNull: true,  // user_id can now be nullable (if the user is deleted)
      references: {
        model: 'users',  // Ensure the 'users' table name matches the actual table name
        key: 'id',
      },
      onDelete: 'SET NULL',  // If the user is deleted, set user_id to NULL in services
      onUpdate: 'CASCADE',   // If the user's id is updated, update the user_id in services
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
    tableName: 'services', // The actual table name in the DB
    timestamps: true, // Enable Sequelize's automatic timestamp management
    underscored: true, // Use snake_case for column names, e.g., created_at, updated_at
  }
);

// Ensure associations are set up
Service.associate({ User });

export default Service;
