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
  BeforeCreate,
} from 'sequelize-typescript';  // Import necessary decorators
import { Optional } from 'sequelize';  // Import Optional for defining creation attributes
import { v4 as uuidv4 } from 'uuid';  // Import uuid to generate UUIDs
import { sequelize } from '../config/database';  // Correctly import sequelize instance
import User from './user';  // Correctly import User model (ensure path is correct)

// Define Service attributes interface
export interface ServiceAttributes {
  id: string;  // UUID type for the id
  title: string;
  description: string;
  price: number;
  userId: string;  // userId matches the type of User's id (UUID)
  role: string;  // Add role field
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes for the Service model
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

@Table({
  tableName: 'services',
  timestamps: true,  // Ensure timestamps are enabled
})
export class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,  // Automatically generate UUID if not provided
  })
  declare id: string;  // Define the primary key (UUID) for the service

  @Column(DataType.STRING)
  title!: string;  // Define title as a string

  @Column(DataType.TEXT)
  description!: string;  // Define description as text

  @Column(DataType.FLOAT)
  price!: number;  // Define price as a float

  @ForeignKey(() => User)  // Foreign key to User
  @Column(DataType.UUID)  // Ensure the foreign key is UUID (same type as User's id)
  userId!: string;  // userId matches User model's id type

  @BelongsTo(() => User)  // Define association to User
  user!: User;  // Define user as a relation to the User model

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;  // Automatically set the created date

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;  // Automatically set the updated date

  @Column({
    type: DataType.STRING,
    validate: {
      isIn: [['admin', 'user']],  // Allow only 'admin' or 'user' as valid roles
    },
    defaultValue: 'user',  // Set default role to 'user'
  })
  role!: string;  // Define role field with validation and default value

  @BeforeCreate
  static async setDefaults(instance: Service) {
    if (!instance.id) {
      instance.id = uuidv4();  // Generate UUID if not already set
    }
  }
}

// Export the model using a default export
export default Service;
