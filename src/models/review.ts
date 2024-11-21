import { DataTypes, Model, Optional, Association } from 'sequelize';
import { sequelize } from '../config/database';  // Named import
import User from './user';  // Import User model as a named import
import Service from './services';  // Import Service model as a named import

// Define the attributes for the Review model
export interface ReviewAttributes {
  id: number;
  userId: number;
  serviceId: number;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the attributes required for creating a Review (exclude id)
export type ReviewCreationAttributes = Optional<ReviewAttributes, 'id'>;

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
  public static associations: {
    user: Association<Review, User>;
    service: Association<Review, Service>;
  };

  static associate(models: { User: typeof User; Service: typeof Service }) {
    // A review belongs to a user
    Review.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

    // A review belongs to a service
    Review.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });
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
      references: {
        model: 'users',  // Ensure 'users' is the correct table name
        key: 'id',
      },
      onDelete: 'CASCADE',  // Ensure cascading delete behavior
    },
    serviceId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'services',  // Ensure 'services' is the correct table name
        key: 'id',
      },
      onDelete: 'CASCADE',  // Ensure cascading delete behavior
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // Rating must be at least 1
        max: 5, // Rating can be at most 5
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
    tableName: 'reviews',  // Ensure it matches the table name
    timestamps: true,  // Sequelize handles timestamps automatically
    underscored: true,  // Use snake_case for column names
  }
);

export { Review };
