import { Request, Response } from 'express';
import User from '../models/user';
export declare const userController: {
  registerUser: (req: Request, res: Response) => Promise<Response>;
  loginUser: (req: Request, res: Response) => Promise<Response>;
};
export declare const registerUser: (userData: {
  username: string;
  email: string;
  password: string;
}) => Promise<User>;
export declare const loginUser: (
  email: string,
  password: string
) => Promise<{
  token: string;
  user: User;
}>;
