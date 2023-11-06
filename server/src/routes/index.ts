import { Router } from 'express';
import healthRoute from './health';
import userRoute from './users';
import sessionRoute from './sessions';

const router = Router();

router.use('/health', healthRoute);
router.use('/user', userRoute);
router.use('/session', sessionRoute);

export default router;
