import { Router } from 'express';
import { auth } from '../middleware/auth';
import { healthCheck, signup, login, getCurrentUser } from '../controller/auth';
const router = Router();

router.get('/health', healthCheck);
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', auth, getCurrentUser);

export default router;
