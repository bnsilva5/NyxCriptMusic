import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserProfile } from '../services/user.service'; // Ajusta la ruta según tu estructura
//import { logout } from '../services/user.service'; Añade la función de logout

const HomeUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const tokenFromUrl = query.get('token');

        if (tokenFromUrl) {
            localStorage.setItem('spotifyToken', tokenFromUrl);

            // Consulta el perfil del usuario en tu backend usando la función de servicio
            getUserProfile(tokenFromUrl)
                .then(profile => {
                    setUser(profile.username); // La respuesta es { username: '...' }
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching user profile:', err);
                    setError('Failed to load user profile');
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setError('No token found');
        }
    }, [location.search]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {user ? (
                <div>
                    <h1 style={{color:"white"}}>Welcome, {user}</h1>
                </div>
            ) : (
                <p>User profile not found.</p>
            )}
        </div>
    );
};

export default HomeUser;
