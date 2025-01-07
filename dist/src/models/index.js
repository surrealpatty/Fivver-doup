"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.Order = exports.Service = exports.User = void 0;
// src/models/index.ts
const user_1 = require("./user"); // Named import for User
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const services_1 = require("../models/services"); // Correct named import
Object.defineProperty(exports, "Service", { enumerable: true, get: function () { return services_1.Service; } });
const order_1 = require("./order"); // Default import for Order (if Order is the default export)
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return order_1.Order; } });
const review_1 = require("./review"); // Named import for Review
Object.defineProperty(exports, "Review", { enumerable: true, get: function () { return review_1.Review; } });
