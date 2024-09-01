import React, {useEffect, useState} from 'react';
import styles from './styles/home.login.module.css';

import artist1 from "../assets/images/background/artist1.jpeg";
import artist2 from "../assets/images/background/artist2.jpeg";
import artist3 from "../assets/images/background/artist3.jpeg";
import artist4 from "../assets/images/background/artist4.jpeg";
import artist5 from "../assets/images/background/artist5.jpeg";
import artist6 from "../assets/images/background/artist6.jpeg";
import artist7 from "../assets/images/background/artist7.jpeg";
import artist8 from "../assets/images/background/artist8.jpeg";
import artist9 from "../assets/images/background/artist9.jpeg";
import artist10 from "../assets/images/background/artist10.jpeg";

const images = [
    artist1,
    artist2,
    artist3,
    artist4,
    artist5,
    artist6,
    artist7,
    artist8,
    artist9,
    artist10
];

const initialImages = [0, 2, 4, 6, 8]; // Índices para las imágenes iniciales

const HomeLogin = () => {

    // Estado para los índices de las imágenes actuales
    const [currentIndices, setCurrentIndices] = useState(initialImages);

    const handleLogin = async () => {
        try {
            window.location.href = 'https://accounts.spotify.com/authorize?response_type=code&client_id=92ccf0f237a142d5af8af9a0144a5a71&scope=user-read-private%20user-read-email&redirect_uri=http://localhost:4000/auth/callback'; // Redirige al usuario a la URL de autenticación de Spotify
        } catch (error) {
            console.error('Error redirecting to Spotify:', error);
        }
    };

    useEffect(() => {
        // Cambia las imágenes cada 10 segundos
        const intervalId = setInterval(() => {
            setCurrentIndices((prevIndices) =>
                prevIndices.map((index, i) => (index + 1) % images.length)
            );
        }, 10000); // Cambia cada 10 segundos

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div className="background">
                {currentIndices.map((index, i) => (
                    <div
                        key={i}
                        className={`image image${i + 1}`}
                        style={{
                            backgroundImage: `url(${images[index]})`,
                            left: `${i * 20}%`
                        }}
                    ></div>
                ))}
            </div>

            <div className={styles.welcomeContainer}>
                <div className={styles.welcomeContent}>
                    <h1>Bienvenido</h1>
                    <p>Login with Spotify</p>
                    <button onClick={handleLogin} className={styles.loginButton}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default HomeLogin;
