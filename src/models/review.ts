// src/models/review.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Review extends Model {
  static associate(models: any) {
    // Define associations here
  }
}

Review.init(
  {
    // Model definition here
  },
  {
    sequelize,
    modelName: 'Review',
  }
);

export default Review;  // Default export
