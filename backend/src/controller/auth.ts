import { Request, Response } from 'express';
import {
  signinService,
  signupService,
  getCurrentUserService,
} from '../services/auth';
import { AuthRequest } from '../middleware/auth';

// Health check
export const healthCheck = (req: Request, res: Response) => {
  res.status(200).send('OK');
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const token = await signupService(name, email, password);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });
    res.json({ message: 'Signup successful' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await signinService(email, password);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });
    res.json({ message: 'Login successful' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const user = await getCurrentUserService(req.user.id);
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
