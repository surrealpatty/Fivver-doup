"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    login: function() {
        return login;
    },
    registerUser: function() {
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
// Load environment variables
_dotenv.default.config();
// Set up the transporter with Gmail or another mail service
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
        // Validate required fields
        if (!email || !password || !username) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        // Check if email already exists
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
        // Hash the password using bcrypt
        const hashedPassword = await _bcryptjs.default.hash(password, 10); // 10 is the salt rounds
        // Create a new user with hashed password and isVerified set to false
        const newUser = await _user.User.create({
            username,
            email,
            password: hashedPassword,
            isVerified: false
        });
        // Generate a verification token using JWT
        const verificationToken = _jsonwebtoken.default.sign({
            id: newUser.id
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        } // Token expires in 1 day
        );
        // Create the verification link
        const verificationLink = `${process.env.BASE_URL}/verify?token=${verificationToken}`;
        // Prepare email options
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Please verify your email address',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`
        };
        // Send the verification email asynchronously
        await transporter.sendMail(mailOptions);
        // Return response indicating success
        return res.status(201).json({
            message: 'Registration successful, please check your email for verification.'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error during registration.'
        });
    }
};
const login = async (req, res)=>{
    try {
        const { email, password } = req.body;
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }
        // Find user by email
        const user = await _user.User.findOne({
            where: {
                email
            }
        }); // Ensure this method is available
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        // Check if password is valid (Ensure validatePassword method is defined on the User model)
        const isPasswordValid = await _bcryptjs.default.compare(password, user.password); // Use bcrypt.compare for password validation
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        // Return login success response
        return res.status(200).json({
            message: 'Login successful',
            userId: user.id
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

//# sourceMappingURL=userController.js.map