import { Model, Optional } from 'sequelize/types';
export interface BaseModelAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface BaseModelCreationAttributes
  extends Optional<BaseModelAttributes, 'id'> {}
export default class BaseModel<
  TAttributes extends BaseModelAttributes,
  TCreationAttributes extends BaseModelCreationAttributes,
> extends Model<TAttributes, TCreationAttributes> {
  static associate?(models: any): void;
}
