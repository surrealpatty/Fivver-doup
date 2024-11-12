import { Sequelize, Dialect } from 'sequelize';
interface DBConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
    port: number;
    dialectOptions: {
        charset: string;
    };
    logging: boolean;
}
declare const config: {
    [key: string]: DBConfig;
};
declare const sequelize: Sequelize;
export { sequelize, config };
