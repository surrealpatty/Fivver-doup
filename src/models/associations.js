"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const user_1 = __importDefault(require("./user"));
const service_1 = __importDefault(require("./service"));
const order_1 = __importDefault(require("./order"));
const review_1 = __importDefault(require("./review"));
// Associations
user_1.default.hasMany(service_1.default, { foreignKey: 'userId' });
service_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
service_1.default.hasMany(order_1.default, { foreignKey: 'serviceId' });
order_1.default.belongsTo(service_1.default, { foreignKey: 'serviceId' });
service_1.default.hasMany(review_1.default, { foreignKey: 'serviceId' });
review_1.default.belongsTo(service_1.default, { foreignKey: 'serviceId' });
// Add models to Sequelize instance
database_1.sequelize.addModels([user_1.default, service_1.default, order_1.default, review_1.default]); // Ensure this correctly adds the models
