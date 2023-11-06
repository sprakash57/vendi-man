import { Router } from 'express';
import { sessionValidator } from '../middleware/sessions';
import { createSessionController, deleteSessionController, getSessionController } from '../controller/sessions';
import { isUserAvailable } from '../middleware/users';
import { validate } from '../utils/validateRequest';

const router = Router();

router.post('/', validate(sessionValidator), createSessionController);

router.get('/', isUserAvailable, getSessionController);

router.delete('/', isUserAvailable, deleteSessionController);

export default router;
