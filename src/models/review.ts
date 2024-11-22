import { Sequelize, DataTypes, Model } from 'sequelize';
import User from './user';  // Assuming User model is in user.ts
import Service from './services';  // Assuming Service model is in services.ts

const defineReview = (sequelize: Sequelize) => {
  class Review extends Model {
    public id!: number;
    public rating!: number;
    public comment!: string;
    public serviceId!: number;
    public userId!: string;
  }

  Review.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      serviceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'services',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
      modelName: 'Review',
      tableName: 'reviews',
      timestamps: true,
      underscored: true,
    }
  );

  return Review;
};

export default defineReview;  // Default export
