import { Router } from 'express';
import { depositValidator, userVerification, userValidator, buyerVerification } from '../middleware/users';
import { depositController, getUserController, newUserController, resetDepositController } from '../controller/users';
import { validate } from '../utils/validateRequest';
import { deleteAllSessionController } from '../controller/sessions';

const router = Router();

router.post('/', validate(userValidator), newUserController);

router.get('/profile', userVerification, getUserController);

router.get('/logout/all', userVerification, deleteAllSessionController);

router.post('/deposit', [...validate(depositValidator), userVerification], depositController);

router.put('/deposit', buyerVerification, resetDepositController);

export default router;
