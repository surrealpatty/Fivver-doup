import { Sequelize } from 'sequelize';
declare const config: {
    development: {
        username: string;
        password: string;
        database: string;
        host: string;
        dialect: string;
        port: number;
        dialectOptions: {
            charset: string;
        };
        logging: boolean;
    };
    production: {
        username: string;
        password: string;
        database: string;
        host: string;
        dialect: string;
        port: number;
        dialectOptions: {
            charset: string;
        };
        logging: boolean;
    };
    test: {
        username: string;
        password: string;
        database: string;
        host: string;
        dialect: string;
        port: number;
        dialectOptions: {
            charset: string;
        };
        logging: boolean;
    };
};
declare const sequelize: Sequelize;
export { sequelize, config };
