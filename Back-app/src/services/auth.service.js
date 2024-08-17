// src/services/auth.service.js
import axios from 'axios';
import qs from 'querystring';
import jwt from 'jsonwebtoken';
import UserDao from '../models/DAOs/user.dao.js'; // Importa el DAO

class AuthService {
    static getSpotifyAuthUrl() {
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
        const scopes = 'user-read-private user-read-email'; // Define los scopes que necesites
        return `https://accounts.spotify.com/authorize?${qs.stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scopes,
            redirect_uri: redirectUri
        })}`;
    }

    static async exchangeCodeForTokens(code) {
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

        const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify({
            code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            }
        });

        return response.data;
    }

    static async getUserInfo(accessToken) {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data;
    }

    static async handleSpotifyCallback(code) {
        // Intercambiar el código por tokens
        const { access_token, refresh_token } = await AuthService.exchangeCodeForTokens(code);

        // Obtener información del usuario de Spotify
        const userInfo = await AuthService.getUserInfo(access_token);

        // Buscar o crear el usuario en la base de datos usando el DAO
        let user = await UserDao.findUserBySpotifyId(userInfo.id);

        if (user) {
            // Si el usuario ya existe, actualizar la información
            await UserDao.updateUser(user.user_id, {
                spotify_access_token: access_token,
                spotify_refresh_token: refresh_token,
                profile_picture_url: userInfo.images[0]?.url,
                token_expiry_date: new Date(Date.now() + 3600 * 1000) // Ajusta la expiración según sea necesario
            });
        } else {
            // Si el usuario no existe, crear uno nuevo
            user = await UserDao.createUser({
                username: userInfo.display_name,
                email: userInfo.email,
                spotify_user_id: userInfo.id,
                spotify_access_token: access_token,
                spotify_refresh_token: refresh_token,
                profile_picture_url: userInfo.images[0]?.url,
                token_expiry_date: new Date(Date.now() + 3600 * 1000) // Ajusta la expiración según sea necesario
            });
        }

        // Generar JWT para tu aplicación
        const token = jwt.sign(
            { user_id: user.user_id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return { token, user };
    }
}

export default AuthService;
