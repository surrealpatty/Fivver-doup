"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.Order = exports.Service = exports.User = void 0;
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const services_1 = __importDefault(require("./services"));
exports.Service = services_1.default;
const order_1 = require("./order");
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return order_1.Order; } });
const review_1 = require("./review");
Object.defineProperty(exports, "Review", { enumerable: true, get: function () { return review_1.Review; } });
const database_1 = require("@config/database");
user_1.User.hasMany(services_1.default, { foreignKey: 'userId' });
services_1.default.belongsTo(user_1.User, { foreignKey: 'userId' });
user_1.User.hasMany(review_1.Review, { foreignKey: 'userId' });
review_1.Review.belongsTo(user_1.User, { foreignKey: 'userId' });
services_1.default.hasMany(review_1.Review, { foreignKey: 'serviceId' });
review_1.Review.belongsTo(services_1.default, { foreignKey: 'serviceId' });
order_1.Order.belongsTo(user_1.User, { foreignKey: 'userId' });
order_1.Order.belongsTo(services_1.default, { foreignKey: 'serviceId' });
database_1.sequelize.sync({ force: false }).then(() => {
    console.log('Model associations are successfully set up.');
});
