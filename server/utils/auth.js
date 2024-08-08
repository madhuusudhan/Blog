import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
export const auth = (req, res, next) => {
    const token = req.cookies['access-token'];
    if(!token) {
        return next(errorHandler(401,'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log("Token verification failed");
            return next(errorHandler(401, 'Token verification failed'));
        }
        req.user = user;
        next();
    })
}