// src/dao/user.dao.js
import User from '../../models/user.model.js'; // Importa el modelo de usuario

class UserDao {
    static async findUserBySpotifyId(spotifyUserId) {
        return User.findOne({ where: { spotify_user_id: spotifyUserId } });
    }

    static async createUser(userData) {
        console.log("USUARIO_CREADOOO: ", userData);
        return User.create(userData);
    }

    static async updateUser(userId, userData) {
        return User.update(userData, { where: { user_id: userId }, returning: true });
    }
}

export default UserDao;
