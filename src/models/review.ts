import { Column, DataType, Model, Table } from 'sequelize-typescript';  // Adjust imports for sequelize-typescript

// Define the Review model
@Table({ tableName: 'reviews', timestamps: true })  // Use @Table decorator to specify the table name
export class Review extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  public serviceId!: string;  // Reference to the service being reviewed

  @Column({ type: DataType.STRING, allowNull: false })
  public userId!: string;  // Reference to the user who wrote the review

  @Column({ type: DataType.INTEGER, allowNull: false })
  public rating!: number;  // Rating given in the review

  @Column({ type: DataType.TEXT, allowNull: false })
  public comment!: string;  // Text comment in the review
}

export default Review;  // Default export of the Review model
