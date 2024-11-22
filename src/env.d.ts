// src/env.d.ts

declare namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string; // Ensure the JWT_SECRET variable is correctly typed
    }
  }
  