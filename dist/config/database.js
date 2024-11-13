"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_SSL, NODE_ENV, } = process.env;
// Ensure required environment variables are present
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
    throw new Error('Missing required database environment variables');
}
// Convert DB_SSL to a boolean if it's set to 'true'
const useSSL = DB_SSL === 'true';
// Create a new Sequelize instance with the given environment variables
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
        ssl: useSSL ? { rejectUnauthorized: false } : false, // Use SSL only if DB_SSL is true
        charset: 'utf8mb4', // Ensure correct charset to avoid encoding issues
    },
    define: {
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    pool: {
        acquire: 30000,
        idle: 10000,
    },
});
exports.sequelize = sequelize;
// Test the database connection and sync models
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        if (NODE_ENV !== 'test') { // Avoid syncing during Jest tests
            await sequelize.sync({ alter: true });
            console.log('Database tables synced.');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Unable to connect to the database:', error.message);
        }
        else {
            console.error('Unable to connect to the database:', error);
        }
        // Avoid process.exit in tests to prevent teardown issues
        if (NODE_ENV !== 'test') {
            process.exit(1);
        }
    }
};
exports.testConnection = testConnection;
// Test connection and sync if not running tests
if (NODE_ENV !== 'test') {
    testConnection();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2RhdGFiYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlDQUFzQztBQUN0QyxvREFBNEI7QUFFNUIsNkJBQTZCO0FBQzdCLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsTUFBTSxFQUNKLE9BQU8sRUFDUCxPQUFPLEVBQ1AsV0FBVyxFQUNYLE9BQU8sRUFDUCxVQUFVLEVBQ1YsTUFBTSxFQUNOLFFBQVEsR0FDVCxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFaEIsb0RBQW9EO0FBQ3BELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwRSxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7QUFDckUsQ0FBQztBQUVELG9EQUFvRDtBQUNwRCxNQUFNLE1BQU0sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO0FBRWpDLHVFQUF1RTtBQUN2RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUU7SUFDN0QsSUFBSSxFQUFFLE9BQU87SUFDYixPQUFPLEVBQUUsVUFBdUQ7SUFDaEUsT0FBTyxFQUFFLFFBQVEsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUs7SUFDekQsY0FBYyxFQUFFO1FBQ2QsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFHLGlDQUFpQztRQUN2RixPQUFPLEVBQUUsU0FBUyxFQUFHLGtEQUFrRDtLQUN4RTtJQUNELE1BQU0sRUFBRTtRQUNOLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxvQkFBb0I7S0FDOUI7SUFDRCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUUsS0FBSztRQUNkLElBQUksRUFBRSxLQUFLO0tBQ1o7Q0FDRixDQUFDLENBQUM7QUE4Qk0sOEJBQVM7QUE1QmxCLCtDQUErQztBQUMvQyxNQUFNLGNBQWMsR0FBRyxLQUFLLElBQW1CLEVBQUU7SUFDL0MsSUFBSSxDQUFDO1FBQ0gsTUFBTSxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO1FBRXRFLElBQUksUUFBUSxLQUFLLE1BQU0sRUFBRSxDQUFDLENBQUUsa0NBQWtDO1lBQzVELE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUN6QyxDQUFDO0lBQ0gsQ0FBQztJQUFDLE9BQU8sS0FBYyxFQUFFLENBQUM7UUFDeEIsSUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFLENBQUM7WUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckUsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFDRCx5REFBeUQ7UUFDekQsSUFBSSxRQUFRLEtBQUssTUFBTSxFQUFFLENBQUM7WUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUMsQ0FBQztBQU9rQix3Q0FBYztBQUxsQyxnREFBZ0Q7QUFDaEQsSUFBSSxRQUFRLEtBQUssTUFBTSxFQUFFLENBQUM7SUFDeEIsY0FBYyxFQUFFLENBQUM7QUFDbkIsQ0FBQyJ9