import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const signupService = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, passwordHash });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
  return token;
};

export const signinService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
  return token;
};

export const getCurrentUserService = async (userId: string) => {
  const user = await User.findById(userId).select('-passwordHash');
  return user;
};
