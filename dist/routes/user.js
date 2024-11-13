"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs")); // bcryptjs for compatibility
const user_1 = require("../models/user"); // Corrected import for User model
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
// User registration route
router.post('/register', 
// Validation middleware
(0, express_validator_1.body)('username').isString().notEmpty().withMessage('Username is required'), (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email format'), (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'), (0, express_validator_1.body)('firstName').isString().notEmpty().withMessage('First name is required'), (0, express_validator_1.body)('lastName').isString().notEmpty().withMessage('Last name is required'), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password, firstName, lastName } = req.body;
    try {
        // Check if username already exists
        const existingUser = await user_1.User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        // Check if email already exists
        const existingEmail = await user_1.User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken' });
        }
        // Hash the password before saving it
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create the user without passing 'createdAt' and 'updatedAt'
        const user = await user_1.User.create({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: 'Free', // Default role for a new user
            subscriptionStatus: 'Inactive', // Default subscription status
        });
        // Respond with the created user data (excluding password)
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            subscriptionStatus: user.subscriptionStatus,
        });
    }
    catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFvRDtBQUNwRCx3REFBOEIsQ0FBQyw2QkFBNkI7QUFDNUQseUNBQXNDLENBQUMsa0NBQWtDO0FBQ3pFLHlEQUEyRDtBQUUzRCxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUV4QiwwQkFBMEI7QUFDMUIsTUFBTSxDQUFDLElBQUksQ0FDVCxXQUFXO0FBQ1gsd0JBQXdCO0FBQ3hCLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsRUFDMUUsSUFBQSx3QkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxFQUMzRCxJQUFBLHdCQUFJLEVBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLHdDQUF3QyxDQUFDLEVBQzNGLElBQUEsd0JBQUksRUFBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsd0JBQXdCLENBQUMsRUFDN0UsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxFQUMzRSxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUEsb0NBQWdCLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBRXBFLElBQUksQ0FBQztRQUNILG1DQUFtQztRQUNuQyxNQUFNLFlBQVksR0FBRyxNQUFNLFdBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakUsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNqQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBRUQsZ0NBQWdDO1FBQ2hDLE1BQU0sYUFBYSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQ2xCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFRCxxQ0FBcUM7UUFDckMsTUFBTSxjQUFjLEdBQUcsTUFBTSxrQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFdkQsOERBQThEO1FBQzlELE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE1BQU0sQ0FBQztZQUM3QixRQUFRO1lBQ1IsS0FBSztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVM7WUFDVCxRQUFRO1lBQ1IsSUFBSSxFQUFFLE1BQU0sRUFBRSw4QkFBOEI7WUFDNUMsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLDhCQUE4QjtTQUMvRCxDQUFDLENBQUM7UUFFSCwwREFBMEQ7UUFDMUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1gsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7U0FDNUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFHLEtBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQztBQUNILENBQUMsQ0FDRixDQUFDO0FBRUYsa0JBQWUsTUFBTSxDQUFDIn0=