"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid"); // Import uuidv4 from 'uuid'
const user_1 = require("../models/user");
// ... rest of the code ...
const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        // ... rest of the code ...
        // Hash the password before saving it
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create a new user 
        const newUser = await user_1.User.create({
            id: (0, uuid_1.v4)(), // Add the 'id' property
            email,
            username,
            password: hashedPassword,
            role: '',
            tier: '',
            isVerified: false,
        });
        // ... rest of the code ...
    }
    catch (error) {
        // ... rest of the code ...
    }
};
exports.registerUser = registerUser;
// ... rest of the code ...
//# sourceMappingURL=index.js.map