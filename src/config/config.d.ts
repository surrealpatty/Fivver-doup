declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_HOST?: string;
            DB_USER?: string;
            DB_PASSWORD?: string;
            DB_NAME?: string;
            DB_PORT?: string;
            NODE_ENV?: string;
            JWT_SECRET: string;
            JWT_EXPIRATION?: string;
        }
    }
}
declare const config: {
    db: {
        host: string;
        user: string;
        password: string;
        database: string;
        port: number;
    };
    nodeEnv: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
};
export default config;
