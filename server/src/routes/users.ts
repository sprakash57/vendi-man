import { Router } from 'express';
import { depositValidator, userVerification, userValidator, buyerVerification } from '../middleware/users';
import {
  deleteUserController,
  depositController,
  getUserController,
  newUserController,
  resetDepositController,
} from '../controller/users';
import { validate } from '../utils/validateRequest';

const router = Router();

router.post('/', validate(userValidator), newUserController);

router.get('/', userVerification, getUserController);

router.delete('/', userVerification, deleteUserController);

router.post('/deposit', [...validate(depositValidator), userVerification], depositController);

router.put('/deposit/reset', buyerVerification, resetDepositController);

export default router;
