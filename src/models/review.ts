import { Column, DataType, Model, Table } from 'sequelize-typescript';

// Define the Review model class
@Table({ tableName: 'reviews', timestamps: true })
class Review extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  serviceId!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  userId!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  rating!: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  comment!: string;
}

export default Review;
