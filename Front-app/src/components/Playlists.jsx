// src/components/Playlists.jsx
import React, { useEffect, useState } from 'react';
import axios from "../api/config.api";

const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/user_playlists', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setPlaylists(response.data);
                } catch (error) {
                    console.error('Error al obtener listas de reproducción:', error);
                }
            }
        };

        fetchPlaylists();
    }, []);

    return (
        <div>
            <h1>Your Playlists</h1>
            <ul>
                {playlists.items && playlists.items.map(playlist => (
                    <li key={playlist.id}>{playlist.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Playlists;
