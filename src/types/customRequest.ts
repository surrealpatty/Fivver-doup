// src/types/customRequest.ts
export interface CustomAuthRequest extends Request {
  user?: { // Make user optional
      id: string;
      email: string;
      username: string;
  };
}
