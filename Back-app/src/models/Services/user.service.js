import UserDao from "../DAOs/user.dao.js";
import UserDto from "../DTOs/user.dto.js";

class UserService {
    static async createUser(userData) {
        try {
            const result = await UserDao.createUser(userData);            
            if (!result || !result.user) {
                throw new Error('Failed to search user');
            }
            let userDto = new UserDto(result.user);
            return {
                result: userDto,
                token: result.token
            }
        } catch (error) {
            throw new Error(error.message || 'Failed to create userService');
        };
    };

    static async findUserlogin(email, password) {
        try {
            const result = await UserDao.findUser(email, password);
            if (!result || !result.user) {
                throw new Error('Failed to search userService');
            }
            let userDto = new UserDto(result.user);
            return {
                result: userDto,
                token: result.token
            }
        } catch (error) {
            throw new Error(error.message || 'Failed to find userService');
        };
    }
}

export default UserService;