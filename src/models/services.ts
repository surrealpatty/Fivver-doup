// src/models/services.ts
import { Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript';  // Adjust imports for sequelize-typescript
import User from './user';  // Import the User model to establish the relationship

// Define the interface for the Service model creation attributes
export interface ServiceCreationAttributes {
  userId: number;        // userId is required for creating a service
  description: string;   // description of the service
  price: number;         // price of the service
  title: string;         // title of the service
  category: string;      // category of the service
}

// Define the Service model
@Table({ tableName: 'services', timestamps: true })  // Add the @Table decorator to define table name and timestamps
class Service extends Model<ServiceCreationAttributes> implements ServiceCreationAttributes {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number;  // Primary key with auto-increment

  @ForeignKey(() => User)  // Establish a foreign key relationship with the User model
  @Column({ type: DataType.INTEGER, allowNull: false })
  public userId!: number;  // userId field as a reference to the user (foreign key)

  @Column({ type: DataType.STRING, allowNull: false })
  public title!: string;   // title of the service

  @Column({ type: DataType.STRING, allowNull: false })
  public description!: string;  // description field for the service

  @Column({ type: DataType.FLOAT, allowNull: false })
  public price!: number;  // price field for the service

  @Column({ type: DataType.STRING, allowNull: false })
  public category!: string;  // category of the service
}

// Export the Service model as the default export
export default Service;
