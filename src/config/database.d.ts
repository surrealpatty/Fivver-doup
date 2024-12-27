import { Sequelize } from 'sequelize-typescript';
declare module 'src/config/database' {
  export const sequelize: any; // Or replace 'any' with the correct Sequelize type
}
