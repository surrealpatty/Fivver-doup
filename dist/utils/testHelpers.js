"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createMockUserToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
};
exports.createMockUserToken = createMockUserToken;
