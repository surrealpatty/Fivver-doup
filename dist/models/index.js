"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Service = exports.User = void 0;
// Import each model
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const services_1 = __importDefault(require("./services")); // Ensure this path is correct
exports.Service = services_1.default;
const order_1 = __importDefault(require("./order"));
exports.Order = order_1.default;
//# sourceMappingURL=index.js.map