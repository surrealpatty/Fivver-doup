"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
// Example route handler
userRouter.get('/', (_req, res) => {
    return res.json({ message: 'User routes are working!' });
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map