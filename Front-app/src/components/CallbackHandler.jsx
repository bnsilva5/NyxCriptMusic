// src/components/CallbackHandler.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiado de useHistory a useNavigate
import axios from "../api/config.api";

const CallbackHandler = () => {
    const navigate = useNavigate(); // Cambiado de history a navigate

    useEffect(() => {
        // Función para manejar el callback
        const handleCallback = () => {
            const queryParams = new URLSearchParams(window.location.search);
            const code = queryParams.get('code');

            if (code) {
                // Envía el código al backend para obtener el token
                axios.get(`/auth/callback`, {
                    params: { code }
                })
                    .then(response => {
                        const { token } = response.data;

                        if (token) {
                            // Guarda el token en el almacenamiento local
                            localStorage.setItem('token', token);
                            navigate('/home-user'); // Cambiado de history.push a navigate
                        } else {
                            console.error('No se recibió token');
                        }
                    })
                    .catch(error => {
                        console.error('Error al manejar el callback:', error);
                    });
            }
        };

        // Llamar a la función handleCallback
        handleCallback();

    }, [navigate]); // Actualizado para usar navigate en las dependencias

    return <div>Processing...</div>;
};

export default CallbackHandler;
