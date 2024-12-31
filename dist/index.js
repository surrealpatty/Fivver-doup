// src/index.ts
import express from 'express';
import http from 'http';
import { sequelize } from './config/database';
const app = express();
const server = http.createServer(app);
// Set up routes and middleware
app.get('/', (req, res) => res.send('Hello World!'));
sequelize.sync().then(() => {
    if (process.env.NODE_ENV !== 'test') {
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
});
// Export both app and server as named exports
export { app, server };
