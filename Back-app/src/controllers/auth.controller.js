import UserService from "../models/Services/user.service.js";

class UserController {
    static async register(req, res) {
        try {
            const userData = req.body;
            // Crear el usuario utilizando el servicio
            const userDTO = await UserService.createUser(userData);
            // Enviar la respuesta con el DTO del usuario creado
            res.status(201).json(userDTO);
        } catch (error) {
            // Manejar los diferentes tipos de errores
            if (error.message === 'Email already in use') {
                res.status(409).json({ message: error.message });
            } else if (error.message === 'Username already in use') {
                res.status(409).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        };
    };

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            // Crear el usuario utilizando el servicio
            const userDTO = await UserService.findUserlogin(email, password);
            res.cookie("token", userDTO.token);
            // Enviar la respuesta con el DTO del usuario creado
            res.status(201).json(userDTO);
        } catch (error) {
            // Manejar los diferentes tipos de errores
            res.status(500).json({ message: error.message });
        };
    };

    static logout(req, res) {
        res.cookie('token', "", {
            expires: new Date(0)
        });
        return res.sendStatus(200);
    }
}

export default UserController;