"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerUser", {
    enumerable: true,
    get: function() {
        return registerUser;
    }
});
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _user = require("../models/user");
const _nodemailer = /*#__PURE__*/ _interop_require_default(require("nodemailer"));
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config();
// Nodemailer setup for email verification
const transporter = _nodemailer.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});
const registerUser = async (req, res)=>{
    const { email, password, username } = req.body;
    try {
        if (!email || !password || !username) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        // Check if the user already exists
        const existingUser = await _user.User.findOne({
            where: {
                email
            }
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'Email already in use'
            });
        }
        // Hash the password
        const hashedPassword = await _bcryptjs.default.hash(password, 10);
        // Create the new user object with default values
        const newUser = await _user.User.create({
            username,
            email,
            password: hashedPassword,
            role: 'free',
            tier: 'free',
            isVerified: false
        });
        // Generate a JWT verification token
        const verificationToken = _jsonwebtoken.default.sign({
            id: newUser.id
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        } // Token expires in 1 day
        );
        // Create the verification URL
        const verificationLink = `${process.env.BASE_URL}/verify?token=${verificationToken}`;
        // Email options for sending verification email
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Please verify your email address',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`
        };
        // Send the email
        await transporter.sendMail(mailOptions);
        return res.status(201).json({
            message: 'Registration successful, please check your email for verification.'
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({
            message: 'Server error during registration.'
        });
    }
};

//# sourceMappingURL=userController.js.map