import { Router } from 'express';
import UserController from '../controllers/auth.controller.js';


const router = Router();

router.post('/register', UserController.createUser);
//router.post('/login', login);

export default router;