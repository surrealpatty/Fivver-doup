import { Model, Optional } from 'sequelize/types'; // Correct import for Optional from sequelize/types

// Base model attributes interface for common fields like 'id', 'createdAt', and 'updatedAt'
export interface BaseModelAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Optional attributes for model creation (where 'id' can be omitted)
export interface BaseModelCreationAttributes extends Optional<BaseModelAttributes, 'id'> {}

// BaseModel class definition
export default class BaseModel<
  TAttributes extends BaseModelAttributes,
  TCreationAttributes extends BaseModelCreationAttributes
> extends Model<TAttributes, TCreationAttributes> {
  static associate?(models: any): void; // Method for defining associations if needed
}

