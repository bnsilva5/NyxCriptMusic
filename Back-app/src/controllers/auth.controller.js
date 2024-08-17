// src/controllers/auth.controller.js
import AuthService from '../services/auth.service.js';
import jwt from 'jsonwebtoken';

class AuthController {
    static async login(req, res) {
        try {
            const authUrl = AuthService.getSpotifyAuthUrl();
            res.redirect(authUrl);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get Spotify auth URL' });
        }
    }

    static async handleCallback(req, res) {
        const code = req.query.code;

        try {
            // Intercambiar el código por tokens y obtener información del usuario
            const { token, user } = await AuthService.handleSpotifyCallback(code);

            // Devuelve el JWT al cliente
            res.json({ token, user });
        } catch (error) {
            res.status(500).json({ "error: ": error });
        }
    }
}

export default AuthController;
