"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
// Example route handler with correct signature
userRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'User routes are working!' });
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map