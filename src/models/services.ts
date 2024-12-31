import { Table, Column, Model, PrimaryKey, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize'; // Import Optional type from Sequelize
import User from './user'; // Import User model

// Define Service attributes
export interface ServiceAttributes {
  id: string;  // Use `string` if using UUIDs
  title: string;
  description: string;
  price: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes for the Service model
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

@Table({ tableName: 'services', timestamps: true })
export default class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;  // Use string if UUID

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.FLOAT)
  price!: number;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;
}
