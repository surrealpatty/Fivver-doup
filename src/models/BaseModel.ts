import { Model } from 'sequelize';

// Define the generic type for the model attributes
export default class BaseModel<T> extends Model<T> {
  // Optional: Define an `associate` method to be implemented by subclasses if necessary
  static associate?(models: any): void;
}

// Interface for the base model attributes, including optional timestamps
export interface BaseModelAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Optionally, you could also create a specific type for creating base models:
export interface BaseModelCreationAttributes extends Optional<BaseModelAttributes, 'id'> {}
