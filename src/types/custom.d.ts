// custom.d.ts
declare global {
    namespace Express {
        interface Request {
            userId?: string;  // Change this to string if your JWT token's id is a string
        }
    }
}
