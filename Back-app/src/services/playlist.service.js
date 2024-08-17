import axios from 'axios';

class PlaylistService {
    static async getUserPlaylists(accessToken) {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching playlists from Spotify:', error); // Imprime el error para depuración
            throw error;  // Re-lanza el error para que pueda ser capturado en el controlador
        }
    };
}

export default PlaylistService;
