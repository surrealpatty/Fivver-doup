// src/models/BaseModel.ts
import { Model } from 'sequelize';

export default class BaseModel extends Model {
  static associate?(models: any): void;
}
