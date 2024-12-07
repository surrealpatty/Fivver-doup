"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const user_1 = require("./routes/user");
const profile_1 = __importDefault(require("./routes/profile"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Welcome to Fiverr Clone!');
});
database_1.sequelize.sync({ alter: true })
    .then(() => {
    console.log('Models are synchronized with the database.');
})
    .catch((error) => {
    console.error('Error syncing models:', error);
});
app.use('/api/users', user_1.userRouter);
app.use('/api/profile', profile_1.default);
database_1.sequelize.authenticate()
    .then(() => {
    console.log('Database connection established.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong!' });
});
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.server = server;
