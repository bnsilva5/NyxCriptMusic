import UserDao from "../models/DAOs/user.dao.js";
import UserDto from "../models/DTOs/user.dto.js";

export class UserController {
    static async getUserProfile(req, res) {
        try {
            const userId = req.user.user_id; // Supone que el middleware de autenticación ha añadido el user_id al request
            const user = await UserDao.findUserById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const userDTO = new UserDto(user);
            return res.json(userDTO);
        } catch (error) {
            console.error('Error getting user profile:', error);
            res.status(500).json({ error: 'Failed to get user profile' });
        }
    }

    static async createUser(req, res) {
        try {
            const newUser = await UserDao.createUser(req.body);
            const userDTO = new UserDto(newUser);
            return res.status(201).json(userDTO);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }

    static async updateUser(req, res) {
        try {
            const userId = req.user.user_id;
            const updatedUser = await UserDao.updateUser(userId, req.body);

            if (updatedUser[0] === 0) { // Verifica si alguna fila fue actualizada
                return res.status(404).json({ error: 'User not found or no changes made' });
            }

            const user = await UserDao.findUserById(userId);
            const userDTO = new UserDto(user);
            return res.json(userDTO);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Failed to update user' });
        }
    }

    static async deleteUser(req, res) {
        try {
            const userId = req.user.user_id;
            const result = await UserDAO.deleteUser(userId);

            if (result === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(204).json();
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }
}
