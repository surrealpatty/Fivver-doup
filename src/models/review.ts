import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { User } from './user';  // Import the User model to set up foreign key relationship

@Table({ tableName: 'reviews', timestamps: true })  // Enable timestamps if you want to track createdAt and updatedAt
export class Review extends Model<Review> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;  // Declare 'id' to avoid overwriting the base 'id' property in the Model

  @ForeignKey(() => User)  // Foreign key to User model
  @Column(DataType.UUID)  // userId should be UUID to match User's id type
  userId!: string;  // Declare userId as a string for UUID

  @Column(DataType.STRING)
  content!: string;  // Review content

  // Declare the 'createdAt' and 'updatedAt' to avoid overwriting the base properties in the Model
  declare createdAt: Date;  // Declare 'createdAt' to use the Sequelize default behavior
  declare updatedAt: Date;  // Declare 'updatedAt' to use the Sequelize default behavior
}

export default Review;
