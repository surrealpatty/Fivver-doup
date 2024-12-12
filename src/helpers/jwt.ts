import * as jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

export const generateToken = (userId: number): string => {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
};