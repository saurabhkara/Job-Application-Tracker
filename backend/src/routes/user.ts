import express from 'express';
import * as userController from '../controllers/userController';
import { requireAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/', requireAuth,userController.isUserAuthenticated);
router.post('/signup',userController.signupController);
router.post('/login',userController.loginController);
router.post('/logout',userController.logoutController);

export default router;