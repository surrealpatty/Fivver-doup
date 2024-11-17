// src/config/database.d.ts
import { Sequelize } from 'sequelize';  // Import Sequelize types

declare module '../config/database' {
  export const sequelize: Sequelize;  // Type 'sequelize' as an instance of Sequelize
}
