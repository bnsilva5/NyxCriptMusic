import User from "../user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../../libs/jwt.js";

class UserDao {
    static async createUser(userData) {
        try {
            // Verificar si el usuario con el mismo email ya existe
            const existingEmailUser = await User.findOne({ where: { email: userData.email } });
            if (existingEmailUser) {
                throw new Error('Email already in use');
            }

            // Verificar si el usuario con el mismo username ya existe
            const existingUsernameUser = await User.findOne({ where: { username: userData.username } });
            if (existingUsernameUser) {
                throw new Error('Username already in use');
            }

            // Hash de la contraseña
            let passwordHash;
            if (userData.password) {
                passwordHash = await bcrypt.hash(userData.password, 10);
            }
            userData.password = passwordHash;

            // Crear el usuario en la base de datos
            const newUser = await User.create(userData);

            let token = "";
            // Generar el token JWT
            if (newUser) {
                token = await createAccessToken({id: newUser.dataValues.user_id});
            }

            return {
                user: newUser,
                token
            };
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error(error.message || 'Failed to create user');
        };
    };

    static async findUser(email, password) {
        try {
            // Verificar si el usuario con el mismo email ya existe
            const userFound = await User.findOne({ where: {email: email} });
            if (!userFound) {
                throw new Error('User not found');
            }
            const isMatch = await bcrypt.compare(password, userFound.password);
            if (!isMatch) {
                throw new Error('Incorrect password');
            }

            const token = await createAccessToken({id: userFound.user_id});

            return {
                user: userFound,
                token
            };
        } catch (error) {
            console.error('Error searching the user:', error);
            throw new Error(error.message || 'Failed to find user');
        };
    };
}

export default UserDao;