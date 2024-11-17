import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Correctly import sequelize instance
import User from './user'; // Import the User model

// Define the attributes for the "services" table
interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  user_id: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type ServiceCreationAttributes = Optional<ServiceAttributes, 'id'>

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public user_id!: number | null;
  public createdAt?: Date;
  public updatedAt?: Date;

  static associate(models: { User: typeof User }) {
    Service.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true,
    underscored: true,
  }
);

export default Service;
