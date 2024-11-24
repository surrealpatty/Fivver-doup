// src/models/services.ts
import { Column, DataType, Model, Table } from 'sequelize-typescript';  // Adjust imports for sequelize-typescript

// Define the interface for the Service model creation attributes
export interface ServiceCreationAttributes {
  userId: string;        // userId is required for creating a service
  description: string;   // description of the service
  price: number;         // price of the service
}

// Define the Service model
@Table({ tableName: 'services', timestamps: true })  // Add the @Table decorator to define table name and timestamps
class Service extends Model<ServiceCreationAttributes> implements ServiceCreationAttributes {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number;  // Primary key with auto-increment

  @Column({ type: DataType.STRING, allowNull: false })
  public userId!: string;  // userId field as a reference to the user (foreign key)

  @Column({ type: DataType.STRING, allowNull: false })
  public description!: string;  // description field for the service

  @Column({ type: DataType.FLOAT, allowNull: false })
  public price!: number;  // price field for the service
}

// Export the Service model as the default export
export default Service;
