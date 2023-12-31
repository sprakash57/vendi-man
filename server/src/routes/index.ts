import { Router } from 'express';
import healthRoute from './health';
import userRoute from './users';
import sessionRoute from './sessions';
import productsRoute from './products';

const router = Router();

router.use('/health', healthRoute);
router.use('/users', userRoute);
router.use('/sessions', sessionRoute);
router.use('/products', productsRoute);

export default router;
