// src/types/express.d.ts
declare global {
  namespace Express {
      interface Request {
          userId?: number;  // Adding userId to the Request object
      }{
        "compilerOptions"; {
          "typeRoots"; [
            "./node_modules/@types",
            "./src/types"
          ]
        }
      }
      
  }
}

export {};
