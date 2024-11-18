import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure this path is correct
import User from './user'; // Import the User model for association

interface ServiceAttributes {
  id: number;
  userId: string;
  title: string;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public userId!: string;
  public title!: string;
  public description!: string;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'services',
    underscored: true,
    timestamps: true,
  }
);

Service.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export default Service;
