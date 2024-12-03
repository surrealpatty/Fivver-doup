import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';  // Import bcrypt for password hashing
import jwt from 'jsonwebtoken';  // Import jwt for generating tokens
import { User } from '../models/user'; // Ensure correct import path for your User model
import nodemailer from 'nodemailer'; // Import nodemailer for sending emails
import dotenv from 'dotenv'; // Import dotenv to load environment variables

// Load environment variables
dotenv.config();

// Set up the transporter with Gmail or another mail service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,  // Ensure GMAIL_USER is set in your environment variables
    pass: process.env.GMAIL_PASS,  // Ensure GMAIL_PASS is set in your environment variables
  },
});

// Controller function to handle user registration
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password, username } = req.body;

  try {
    // Validate required fields
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user with hashed password and isVerified set to false
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false, // Set to false until the user verifies their email
    });

    // Generate a verification token using JWT
    const verificationToken = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET as string,  // Ensure JWT_SECRET is set in your environment variables
      { expiresIn: '1d' }  // Token expires in 1 day
    );

    // Create the verification link
    const verificationLink = `${process.env.BASE_URL}/verify?token=${verificationToken}`;

    // Prepare email options
    const mailOptions = {
      from: process.env.GMAIL_USER,  // Use the email from your environment variables
      to: email,
      subject: 'Please verify your email address',
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
    };

    // Send the verification email asynchronously
    await transporter.sendMail(mailOptions);

    // Return response indicating success
    return res.status(201).json({ message: 'Registration successful, please check your email for verification.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error during registration.' });
  }
};

// Controller function to handle user login
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });  // Ensure this method is available
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password is valid (Ensure validatePassword method is defined on the User model)
    const isPasswordValid = await bcrypt.compare(password, user.password);  // Use bcrypt.compare for password validation
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return login success response
    return res.status(200).json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
