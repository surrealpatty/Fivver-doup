"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid"); // Import uuidv4 from the 'uuid' library
const user_1 = require("../models/user");
const router = Router();
// POST /api/users/register - User Registration Route
router.post('/register', async (req, res) => {
    const { email, password, username, tier } = req.body;
    try {
        // Validate required fields
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'Email, password, and username are required' });
        }
        // Check if the user already exists
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }
        // Hash the password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create the new user
        const newUser = await user_1.User.create({
            id: (0, uuid_1.v4)(), // Add the 'id' property
            email,
            username,
            password: hashedPassword,
            role: '',
            tier: '',
            isVerified: false,
        });
        // Generate a JWT token for email verification
        const verificationToken = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_SECRET, // Ensure you have a JWT_SECRET in your .env file
        { expiresIn: '1d' } // The token expires in 1 day
        );
        // Generate the verification link
        const verificationLink = `${process.env.BASE_URL}/verify?token=${verificationToken}`;
        // Setup nodemailer transporter (Ensure you have configured your email settings)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER, // Your Gmail address
                pass: process.env.GMAIL_PASS, // Your Gmail password or App Password
            },
        });
        // Send the verification email
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Please verify your email address',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
        };
        await transporter.sendMail(mailOptions);
        // Respond to the client with success
        return res.status(201).json({
            message: 'User registered successfully. Please check your email to verify your account.',
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                tier: newUser.tier,
            },
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
});
// GET /api/users/verify - Email Verification Route
router.get('/verify', async (req, res) => {
    const { token } = req.query;
    // Check if the token is provided
    if (!token) {
        return res.status(400).json({ message: 'Verification token is required' });
    }
    try {
        // Verify the token using JWT
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded || typeof decoded === 'string') {
            return res.status(400).json({ message: 'Invalid verification token' });
        }
        // Find the user associated with the token
        const user = await user_1.User.findOne({ where: { id: decoded.id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: 'User is already verified' });
        }
        // Mark the user as verified
        user.isVerified = true;
        await user.save();
        return res.status(200).json({ message: 'Email verified successfully' });
    }
    catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ message: 'Error verifying email' });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map