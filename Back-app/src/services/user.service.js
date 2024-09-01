import UserDao from '../models/DAOs/user.dao.js';
import UserDto from '../models/DTOs/user.dto.js';

class UserService {
    static async saveOrUpdateUser(userData) {
        try {
            // Convierte los datos en un DTO
            const userDto = new UserDto(userData);
            
            // Usa el DAO para guardar o actualizar el usuario
            const user = await UserDao.saveOrUpdateUser(userDto);

            return user;
        } catch (error) {
            throw new Error('Failed to save or update user: ' + error.message);
        }
    }
}

export default UserService;