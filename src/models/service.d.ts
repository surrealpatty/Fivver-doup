// src/models/service.d.ts

import { Model, DataTypes } from 'sequelize';

export interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: string;
}

export interface ServiceInstance
  extends Model<ServiceAttributes>,
    ServiceAttributes {}

declare const Service: Model<ServiceInstance>;
export default Service;
