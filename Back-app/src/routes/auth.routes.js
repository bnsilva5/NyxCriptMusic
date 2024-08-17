import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import PlaylistController from "../controllers/playlist.controller.js"; // Importar el middleware


const router = Router();

// Ruta para iniciar sesión con Spotify
router.get('/auth/login', AuthController.login);

// Ruta de callback para manejar la redirección de Spotify
router.get('/auth/callback', AuthController.handleCallback);


router.get('/user/playlists', authenticateToken, PlaylistController.getPlaylists);

export default router;