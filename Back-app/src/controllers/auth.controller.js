import AuthService from '../services/auth.service.js'; // Asegúrate de importar el AuthService

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
            const { token } = await AuthService.handleSpotifyCallback(code);
            // Redirige al usuario al frontend con el token como parámetro en la URL
            res.redirect(`http://localhost:3000/home-user?token=${token}`);
        } catch (error) {
            console.error('Error handling Spotify callback:', error);
            res.status(500).json({ error: 'Failed to handle Spotify callback' });
        }
    }
}

export default AuthController;
