import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid'; // Import uuid package

dotenv.config(); // Load environment variables from .env file

// Nodemailer setup for email verification
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Register new user
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password, username } = req.body;

  // Validate the required fields
  if (!email || !password || !username) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a new UUID for the user
    const userId = uuidv4();

    // Create the new user
    const newUser = await User.create({
      id: userId, // Manually set the generated ID
      username,
      email,
      password: hashedPassword,
      role: 'free', // Default role
      tier: 'free', // Default tier
      isVerified: false, // Default to not verified
    });

    // Generate a JWT verification token
    const verificationToken = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET as string, // Make sure JWT_SECRET is set in the .env file
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // Create the verification URL
    const verificationLink = `${process.env.BASE_URL}/verify?token=${verificationToken}`;

    // Email options for sending the verification email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Please verify your email address',
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
    };

    // Send the verification email
    await transporter.sendMail(mailOptions);

    // Respond with success message
    return res.status(201).json({
      message: 'Registration successful. Please check your email for verification.',
      user: { id: newUser.id, email: newUser.email, username: newUser.username },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Server error during registration.' });
  }
};

// Email Verification Function
export const verifyEmail = async (req: Request, res: Response): Promise<Response> => {
  const { token } = req.query; // Retrieve the token from the query params

  if (!token) {
    return res.status(400).json({ message: 'Verification token is required' });
  }

  try {
    // Verify the token using JWT
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);

    if (!decoded || typeof decoded === 'string') {
      return res.status(400).json({ message: 'Invalid verification token' });
    }

    // Find the user by ID from the decoded token
    const user = await User.findOne({ where: { id: decoded.id } });

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
  } catch (error) {
    console.error('Error verifying email:', error);
    return res.status(500).json({ message: 'Error verifying email' });
  }
};
