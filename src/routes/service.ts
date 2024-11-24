// src/models/service.ts

import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface ServiceCreationAttributes {
  userId: number;
  title: string;
  description: string;
  price: number;
}

@Table({ tableName: 'services', timestamps: true })
class Service extends Model<ServiceCreationAttributes> {
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description!: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price!: number;
}

export { Service };
