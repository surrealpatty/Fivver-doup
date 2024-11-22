import { Model, DataTypes, Optional, Association } from 'sequelize';

// Define the attributes for the Service model
export interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: string;  // userId is a string (UUID) as per your Service model
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes interface (excluding `id`)
export type ServiceCreationAttributes = Optional<ServiceAttributes, 'id'>;

// Define the Service instance, which includes both the attributes and model methods
export interface ServiceInstance extends Model<ServiceAttributes, ServiceCreationAttributes>, ServiceAttributes {
  // Add any instance methods if necessary here
}

// Declare the Service model, which is a `Model` of the `ServiceInstance`
declare const Service: Model<ServiceAttributes, ServiceCreationAttributes> & {
  // Define the associations property
  associations: {
    user: Association<ServiceInstance, User>;  // Reference to the User model
  };
};

export default Service;
