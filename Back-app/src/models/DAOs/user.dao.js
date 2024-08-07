import User from "../user.model.js";

class UserDao {
    static async createUser(userData) {
        const user = await User.create(userData);
        return user;
    };
}

export default UserDao;