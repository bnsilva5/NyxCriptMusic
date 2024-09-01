import jwt from 'jsonwebtoken';

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET, // La clave secreta debería estar en variables de entorno            
            { expiresIn: "1d" },
            (err, token) => {
                if(err) reject(err)
                    resolve(token);
            },
        );
    })
}