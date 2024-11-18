// src/config/config.d.ts
declare module 'src/config/config' {
  const config: {
    JWT_SECRET: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_DIALECT: string;
    DB_SSL: string | boolean;
    NODE_ENV: string;
  };

  export default config;
}
