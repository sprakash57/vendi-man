import { Router } from 'express';
import { depositValidator, userVerification, userValidator, buyerVerification } from '../middleware/users';
import { depositController, getUserController, newUserController, resetDepositController } from '../controller/users';
import { validate } from '../utils/validateRequest';

const router = Router();

router.post('/', validate(userValidator), newUserController);

router.get('/profile', userVerification, getUserController);

router.post('/deposit', [...validate(depositValidator), userVerification], depositController);

router.delete('/deposit', buyerVerification, resetDepositController);

export default router;
