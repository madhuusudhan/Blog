import User from '../models/userModel.js'
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !password || !email || username === '' || email === '' || password === '') {
        return res.status(400).json({ message: 'Please Fill all fields' });
    }
    try {
        // Check if a user with the same username already exists
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            next(errorHandler(400, "Please fill all the Fields"));
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.json({ message: "Signup successful" });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const validpassword = bcryptjs.compareSync(password, validUser.password);
        if (!validpassword) {
            return next(errorHandler(400, 'Invalid Password'));
        }
        const token = jwt.sign({
            id: validUser._id, isAdmin: validUser.isAdmin
        }, process.env.JWT_SECRET_KEY);
        const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access-token', token, {
            httpOnly: true,
        }).json(rest);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const googleFun = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access-token', token, {
                httpOnly: true,
            }).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + (Math.random() * 1000).toString(4).slice(0, 4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET_KEY);
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie('access-token', token, {
                httpOnly: true,
            }).json(rest);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
