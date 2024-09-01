import axios from "../api/config.api";

// Función para obtener el perfil del usuario
export const getUserProfile = async (token) => {
    try {
        const response = await axios.get('/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Error fetching user data');
    }
};
