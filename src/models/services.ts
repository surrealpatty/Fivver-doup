// Ensure reflect-metadata is imported to enable decorators
import 'reflect-metadata';

import { Table, Column, Model, PrimaryKey, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from './user'; // Corrected import of User model with named import

// Define Service attributes interface
export interface ServiceAttributes {
  id: string;  // Use string for UUIDs (UUID should be a string)
  title: string;
  description: string;
  price: number;
  userId: string;  // userId should match the type of User's id
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes for the Service model
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

@Table({ tableName: 'services', timestamps: true })
export class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {

  @PrimaryKey
  @Column(DataType.STRING)  // Use STRING for UUID if you're using UUIDs
  declare id: string;  // Declare id as a string for UUID

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.FLOAT)
  price!: number;

  @ForeignKey(() => User) // Foreign key to User
  @Column(DataType.STRING)  // Ensure the foreign key is of the same type as User's id (string for UUIDs)
  userId!: string;

  @BelongsTo(() => User) // Define association to User
  user!: User;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;  // Declare createdAt as a Date

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;  // Declare updatedAt as a Date
}

export default Service;
