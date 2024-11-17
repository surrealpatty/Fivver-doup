// src/models/service.d.ts

import { Model, DataTypes, Optional } from 'sequelize';

// Define the attributes for the Service model
export interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: number;  // Assuming userId is a number (foreign key to User model)
}

// Define the creation attributes interface (excluding `id`)
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Define the Service instance, which includes both the attributes and model methods
export interface ServiceInstance extends Model<ServiceAttributes, ServiceCreationAttributes>, ServiceAttributes {}

// Define the Service model, which is a `Model` of the `ServiceInstance`
declare const Service: Model<ServiceAttributes, ServiceCreationAttributes>;

export default Service;
