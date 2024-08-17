import PlaylistService from "../services/playlist.service.js";
import UserDao from "../models/DAOs/user.dao.js";

class UserController {
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
