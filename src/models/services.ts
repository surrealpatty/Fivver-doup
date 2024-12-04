import { Column, Model, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { User } from './user'; // Import the User model for the foreign key

export interface ServiceCreationAttributes {  
  title: string;
  description: string;
  price: number;
  userId: number; // Foreign key to User
}

@Table({ tableName: 'services' })
export default class Service extends Model<Service, ServiceCreationAttributes> {  
  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.FLOAT)
  price!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number; // Foreign key to User
}
