// src/models/review.ts

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database'; // Ensure you're importing sequelize instance

export class Review extends Model {
  public serviceId!: string;
  public userId!: string;
  public rating!: number;
  public comment!: string;
}

Review.init(
  {
    serviceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
  }
);

export default Review;  // Make sure to export the Review model
