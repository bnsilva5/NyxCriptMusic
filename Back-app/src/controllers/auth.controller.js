import UserService from "../models/Services/user.service.js";

class UserController {
    static async createUser(req, res) {
        try {
            const userData = req.body;
            const userDTO = await UserService.createUser(userData);
            res.status(201).json(userDTO);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default UserController;