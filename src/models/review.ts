import { DataTypes, Model, Sequelize } from 'sequelize';

class Review extends Model {
  public id!: number;
  public userId!: string;
  public serviceId!: number;
  public content!: string;
  public rating!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const defineReview = (sequelize: Sequelize) => {
  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'reviews',
      timestamps: true,
    }
  );

  return Review;
};

export default defineReview;
