import { Router } from 'express';
import { sessionValidator } from '../middleware/sessions';
import { createSessionController, deleteSessionController, getSessionController } from '../controller/sessions';
import { userVerification } from '../middleware/users';
import { validate } from '../utils/validateRequest';

const router = Router();

router.post('/', validate(sessionValidator), createSessionController);

router.get('/', userVerification, getSessionController);

router.delete('/', userVerification, deleteSessionController);

export default router;
