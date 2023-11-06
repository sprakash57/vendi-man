import { Router } from 'express';
import healthRoute from './health';
import userRoute from './users';

const router = Router();

router.use('/health', healthRoute);
router.use('/users', userRoute);

export default router;
