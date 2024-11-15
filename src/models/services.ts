import { Model, DataTypes, Optional, Sequelize, ModelStatic } from 'sequelize';
import { sequelize } from '../config/database'; // Correct way to import a named export

// Define the attributes for the "services" table.
interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the optional fields for the "services" table (these are only for creating instances, not for database records).
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public userId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Define any virtuals or custom methods here, if needed

  // Define the associate method to establish relationships
  static associate(models: { User: ModelStatic<Model> }) {
    // Define the association with the User model
    Service.belongsTo(models.User, {
      foreignKey: 'userId', // Define the foreign key column
      onDelete: 'SET NULL',  // If the user is deleted, set userId to NULL in services
      onUpdate: 'CASCADE',   // If the user's id is updated, update the userId in services
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',  // Ensure the 'users' table name matches the actual table name
        key: 'id',
      },
      onDelete: 'SET NULL',  // If the user is deleted, set userId to NULL in services
      onUpdate: 'CASCADE',   // If the user's id is updated, update the userId in services
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

export default Service;
