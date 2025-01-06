import 'reflect-metadata'; // Ensure reflect-metadata is imported for sequelize-typescript
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
} from 'sequelize-typescript'; // Import necessary decorators
import { Optional } from 'sequelize'; // Import Optional for defining creation attributes
import { User } from './user'; // Correctly import User model

// Define Service attributes interface
export interface ServiceAttributes {
  id: string; // UUID type for the id
  title: string;
  description: string;
  price: number;
  userId: string; // userId matches the type of User's id (UUID)
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes for the Service model
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

@Table({
  tableName: 'services',
  timestamps: true, // Ensure timestamps are enabled
})
export class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  @PrimaryKey
  @Column(DataType.UUID) // Use UUID for the id field
  declare id: string;

  @Column(DataType.STRING)
  title!: string; // Define title as a string

  @Column(DataType.TEXT)
  description!: string; // Define description as text

  @Column(DataType.FLOAT)
  price!: number; // Define price as a float

  @ForeignKey(() => User) // Foreign key to User
  @Column(DataType.UUID) // Ensure the foreign key is UUID (same type as User's id)
  userId!: string; // userId matches User model's id type

  @BelongsTo(() => User) // Define association to User
  user!: User; // Define user as a relation to the User model

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date; // Automatically set the created date

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date; // Automatically set the updated date
}

// Export the model using a default export
export default Service;
