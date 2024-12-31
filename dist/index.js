import express from 'express';
import http from 'http';
import { sequelize } from './config/database';
const app = express();
const server = http.createServer(app);
// Set up the root route
app.get('/', (req, res) => {
    // Return the expected message
    res.status(200).send('Fiverr backend is running');
});
// Sync database and start the server if not in test environment
sequelize.sync().then(() => {
    if (process.env.NODE_ENV !== 'test') {
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
});
// Export both app and server for use in other files, such as tests
export { app, server };
//# sourceMappingURL=index.js.map