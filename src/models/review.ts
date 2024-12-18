import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'reviews' })
export class Review extends Model {
  // Declare id to override the base property (fixes the overwriting issue)
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;  // Declare 'id' to avoid overwriting the base 'id' property in the Model

  @Column(DataType.INTEGER)
  userId!: number;

  @Column(DataType.STRING)
  content!: string;

  // You can add more fields for Review if necessary
}
