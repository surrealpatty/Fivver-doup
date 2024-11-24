"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.Service = exports.User = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("./user")); // Import the User model
exports.User = user_1.default;
const service_1 = __importDefault(require("./service")); // Import the Service model
exports.Service = service_1.default;
const review_1 = __importDefault(require("./review")); // Import the Review model
exports.Review = review_1.default;
// Create an instance of Sequelize (make sure to adjust the database connection details as needed)
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost', // Adjust as necessary
    database: 'fivver_doup', // Adjust as necessary
    username: 'root', // Adjust as necessary
    password: 'password', // Adjust as necessary
});
exports.sequelize = sequelize;
// Define associations between models (if required)
user_1.default.hasMany(review_1.default, { foreignKey: 'userId' });
review_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
service_1.default.hasMany(review_1.default, { foreignKey: 'serviceId' });
review_1.default.belongsTo(service_1.default, { foreignKey: 'serviceId' });
