import { Model, Column, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './user';  // Assuming User model is imported correctly

// Define the attributes for the Service model (for creation)
export interface ServiceCreationAttributes {
  userId: number;
  title: string;
  description: string;
  price: number;
}

// Define the Sequelize Service model class
@Table({ tableName: 'services', timestamps: true })
class Service extends Model<ServiceCreationAttributes> {
  @ForeignKey(() => User)  // Assuming Service has a ForeignKey relationship with User
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description!: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price!: number;
}

// Export both the Service model and the ServiceCreationAttributes interface
export { Service, ServiceCreationAttributes };
