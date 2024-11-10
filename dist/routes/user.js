"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// In the route
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, firstName, lastName } = req.body;
    try {
        // Ensure firstName and lastName are non-null strings
        if (!firstName || !lastName) {
            return res.status(400).json({ message: 'First and last name are required' });
        }
        // Check if the user already exists (checking by both username and email)
        const existingUser = yield User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        const existingEmail = yield User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken' });
        }
        // Hash the password before saving
        const hashedPassword = yield bcrypt.hash(password, 10);
        // Create a new user with default 'Free' role and 'Inactive' subscription status
        const user = yield User.create({
            username,
            email,
            password: hashedPassword, // Store the hashed password
            firstName,
            lastName,
            role: 'Free', // Default to "Free" role
            subscriptionStatus: 'Inactive', // Default to "Inactive"
        });
        // Respond with user details excluding password
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
}));
//# sourceMappingURL=user.js.map