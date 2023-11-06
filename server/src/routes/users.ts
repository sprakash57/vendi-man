import { Router } from 'express';
import { isUserAvailable, userValidator } from '../middleware/users';
import { getUserController, newUserController } from '../controller/users';
import { validate } from '../utils/validateRequest';
import { deleteAllSessionController } from '../controller/sessions';

const router = Router();

router.post('/', validate(userValidator), newUserController);

router.get('/profile', isUserAvailable, getUserController);

router.get('/logout/all', isUserAvailable, deleteAllSessionController);

export default router;
