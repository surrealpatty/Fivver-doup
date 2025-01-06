import 'reflect-metadata'; // Ensure reflect-metadata is imported for sequelize-typescript
import { Table, Column, Model, PrimaryKey, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';  // Correct decorators from sequelize-typescript
import { Optional } from 'sequelize';  // Import Optional from sequelize
import { User } from './user';  // Correct import of User model with named import

// Define Service attributes interface
export interface ServiceAttributes {
  id: string;  // UUID type for the id
  title: string;
  description: string;
  price: number;
  userId: string;  // userId matches the type of User's id (UUID)
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes for the Service model
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

@Table({ tableName: 'services', timestamps: true })
export class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  @PrimaryKey
  @Column(DataType.UUID)  // Use UUID for the id field (UUIDV4)
  declare id: string;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.FLOAT)
  price!: number;

  @ForeignKey(() => User) // Foreign key to User
  @Column(DataType.UUID)  // Ensure the foreign key is UUID (same type as User's id)
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
