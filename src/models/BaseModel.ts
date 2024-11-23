import { Model, Optional } from 'sequelize';

// Base model attributes interface for common fields like 'id', 'createdAt', and 'updatedAt'
export interface BaseModelAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Optional attributes for model creation (where 'id' can be omitted)
export interface BaseModelCreationAttributes extends Optional<BaseModelAttributes, 'id'> {}

// BaseModel class definition
export default class BaseModel<TAttributes, TCreationAttributes> extends Model<TAttributes, TCreationAttributes> {
  static associate?(models: any): void; // Method to define model associations, if needed
}
