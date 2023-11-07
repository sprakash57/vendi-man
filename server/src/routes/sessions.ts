import { Router } from 'express';
import { sessionValidator } from '../middleware/sessions';
import {
  createSessionController,
  deleteAllSessionController,
  deleteSessionController,
  getSessionController,
} from '../controller/sessions';
import { userVerification } from '../middleware/users';
import { validate } from '../utils/validateRequest';

const router = Router();

router.post('/', validate(sessionValidator), createSessionController);

router.get('/', userVerification, getSessionController);

router.put('/logout', userVerification, deleteSessionController);

router.put('/logout/all', userVerification, deleteAllSessionController);

export default router;
