import axios from 'axios';

class PlaylistService {
    static async getUserPlaylists(accessToken) {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log("RESPONSE_PLAYLIST: ", response);
            return response.data.items; // Devuelve las playlists
        } catch (error) {
            throw new Error('Failed to fetch playlists');
        }
    }
}

export default PlaylistService;
