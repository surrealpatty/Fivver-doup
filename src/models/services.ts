// src/models/service.ts
import { Column, Model, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { User } from './user';

export interface ServiceCreationAttributes {
  title: string;
  description: string;
  price: number;
  userId: number;
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
  userId!: number;
}
