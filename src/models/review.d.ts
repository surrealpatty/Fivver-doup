import { Model, Optional, Association } from 'sequelize'; // Correct import for Model and Optional
import { User } from './user';  // Import the User model type
import { Service } from './services';  // Import the Service model type

// Define the attributes for the Review model
export interface ReviewAttributes {
  id: number;
  userId: string;  // UUID type for userId
  serviceId: number;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the attributes required for creating a Review (exclude id)
export type ReviewCreationAttributes = Optional<ReviewAttributes, 'id'>;

declare class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  public id: number;
  public userId: string;  // UUID for userId
  public serviceId: number;
  public rating: number;
  public comment: string;

  // Readonly timestamps provided by Sequelize
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  // Define associations between models (use static method)
  public static associations: {
    user: Association<Review, User>;
    service: Association<Review, Service>;
  };

  // Static method to define associations between models
  static associate(models: { User: typeof User; Service: typeof Service }): void;
}

export { Review };
