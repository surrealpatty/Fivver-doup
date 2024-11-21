// src/config/config.d.ts
declare module 'src/config/config' {
  export const JWT_SECRET: string;
  export const DB_NAME: string;
  export const DB_USER: string;
  export const DB_PASSWORD: string;
  export const DB_HOST: string;
  export const DB_DIALECT: string;
  export const DB_SSL: string | boolean;
  export const NODE_ENV: string;
}
