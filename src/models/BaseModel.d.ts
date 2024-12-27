import { Model, Optional } from 'sequelize'; // Corrected import


// Define the attributes for the base model
export interface BaseModelAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes for the base model (id is optional during creation)
export interface BaseModelCreationAttributes extends Optional<BaseModelAttributes, 'id'> {}

// Define the BaseModel class that extends Sequelize's Model class
export default class BaseModel<
  TAttributes extends BaseModelAttributes,
  TCreationAttributes extends BaseModelCreationAttributes
> extends Model<TAttributes, TCreationAttributes> {
  // Optional method to associate models, can be overridden by subclasses
  static associate?(models: any): void;
}
