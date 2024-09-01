// src/dao/user.dao.js
import User from '../../models/user.model.js'; // Importa el modelo de usuario

class UserDao {

    // Busca un usuario por su ID interno de la base de datos
    static async findUserById(userId) {
        try {
            return await User.findByPk(userId);
        } catch (error) {
            throw new Error('Error finding user by ID');
        }
    }

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
