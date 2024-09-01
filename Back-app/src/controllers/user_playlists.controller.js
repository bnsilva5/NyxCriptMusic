import PlaylistService from "../services/playlist.service.js";
import UserDao from "../models/DAOs/user.dao.js";

class UserController {

    static async getUserProfile(req, res) {
        try {
            const user = await UserDao.findUserById(req.user.user_id); // Usando el user_id del token decodificado
            if (user) {
                res.json({ username: user.username });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user profile' });
        }
    }

    static async getUserPlaylists(req, res) {
        try {
            const userId = req.user.user_id;
            const user = await UserDao.findUserById(userId);

            if (!user || !user.spotify_access_token) {
                return res.status(401).json({ error: 'User is not authenticated' });
            }

            const playlists = await PlaylistService.getUserPlaylists(user.spotify_access_token);
            res.json(playlists);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get playlists' });
        }
    };
}

export default UserController;
