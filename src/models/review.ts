// src/models/review.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Review extends Model {
  public id!: number;
  public serviceId!: number;  // Foreign key to Service
  public userId!: number;     // Foreign key to User
  public rating!: number;     // Rating value (e.g., 1 to 5)
  public comment!: string;    // Review comment
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'reviews',
  }
);

export default Review;  // Default export
