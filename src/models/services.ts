import { Sequelize, DataTypes, Model } from 'sequelize';
import User from './user';  // Assuming User model is in user.ts

const defineService = (sequelize: Sequelize) => {
  class Service extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public price!: number;
    public category!: string;
    public userId!: string;
  }

  Service.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },
    {
      sequelize,
      modelName: 'Service',
      tableName: 'services',
      timestamps: true,
      underscored: true,
    }
  );

  return Service;
};

export default defineService;  // Default export
