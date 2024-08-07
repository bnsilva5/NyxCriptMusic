import UserDao from "../DAOs/user.dao.js";
import UserDto from "../DTOs/user.dto.js";

class UserService {
    static async createUser(userData) {
        const user = await UserDao.createUser(userData);
        return new UserDto(user);
    }
}

export default UserService;