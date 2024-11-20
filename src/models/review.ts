// src/models/review.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Ensure the sequelize instance is imported
import User from './user';  // Import User model
import Service from './services';  // Import Service model

// Define the attributes for the Review model
interface ReviewAttributes {
  id: number;
  userId: number;
  serviceId: number;
  rating: number;
  comment: string;
}

// Define the attributes required for creating a Review (exclude id)
type ReviewCreationAttributes = Optional<ReviewAttributes, 'id'>;

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  public id!: number;
  public userId!: number;
  public serviceId!: number;
  public rating!: number;
  public comment!: string;

  // Readonly timestamps provided by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations between models
  static associate(models: any) {
    // A review belongs to a user
    Review.belongsTo(models.User, { foreignKey: 'userId' });

    // A review belongs to a service
    Review.belongsTo(models.Service, { foreignKey: 'serviceId' });
  }
}

// Initialize the Review model
Review.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Review',
    timestamps: true,  // Sequelize handles timestamps automatically
  }
);

export default Review;
