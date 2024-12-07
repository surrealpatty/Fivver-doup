// src/controllers/userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Setup for nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false, // User not verified until email confirmation
    });

    // Generate the JWT verification token
    const verificationToken = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // Create the verification URL
    const verificationLink = `${process.env.BASE_URL}/verify?token=${verificationToken}`;

    // Email options for sending verification email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Please verify your email address',
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(201).json({ message: 'Registration successful, please check your email for verification.' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Server error during registration.' });
  }
};
