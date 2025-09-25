import { Router } from 'express';
import authRoutes from './auth';

const router = Router();

// Gán các sub-route
router.use('/auth', authRoutes);

export default router;
