import { Router } from 'express';
import { userValidator } from '../middleware/users';
import { createUserController } from '../controller/users';

const router = Router();

router.post('/', userValidator, createUserController);

export default router;
