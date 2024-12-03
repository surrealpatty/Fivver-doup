import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'reviews' })
export class Review extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)

  @Column(DataType.INTEGER)
  userId!: number;

  @Column(DataType.STRING)
  content!: string;

  // You can add more fields for Review if necessary
}
