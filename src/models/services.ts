import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Optional } from 'sequelize'; // Import Optional type from Sequelize
import User from './user'; // Import User model
import { Service } from '../models/service';  // If service.ts is located in the models folder inside src

// Define Service attributes interface
export interface ServiceAttributes {
  id: string; // Change this from 'number' to 'string' if you're using UUIDs
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
  @Column(DataType.INTEGER)  // Use INTEGER type for the id field
  declare id: number;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.FLOAT)
  price!: number;

  @ForeignKey(() => User) // Foreign key to User
  @Column(DataType.STRING)
  userId!: string;

  @BelongsTo(() => User) // Define association to User
  user!: User;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;
}
