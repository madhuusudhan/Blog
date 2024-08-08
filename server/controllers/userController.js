import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/userModel.js';
export  async function updateUser(req, res, next) {
    console.log(req.user);
    console.log(req.params.userid);
    if(req.user.id != req.params.userid) {
        return next(errorHandler(403, 'You are not Authorized to Update the Details'));
    }
    if(req.body.password) {
        if(req.body.password.length < 6) {
            return next(errorHandler(400, 'Minimum Length of password should be 6'));

        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if(req.body.username) {
        if(req.body.username.length < 6 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Minimum length of username should be 6 and Maximum length 20 '));

        }
        if(req.body.username.includes(' ')) {
            return next(400, 'Username should not conain Spaces');
        }
        if(req.body.username != req.body.username.toLowerCase()) {
            return next(400, 'Username should  conain lowercase alphabets only');
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'Username can only contain letter and numbers'))
        }
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userid, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password
            }
        },{new : true});
        const {passowrd, ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req,res,next) => {
            if(!req.user.isAdmin && req.user.id !== req.params.userid) {
                return next(errorHandler(403,'You are not allowed to delete this user'));
            }
            try {
                await User.findByIdAndDelete(req.params.userid);
                res.status(200).json('User has been ')
            } catch (error) {
                
            }
}
export const signout = (req, res, next) => {
    try {
        res
        .clearCookie('access-token')
        .status(200)
        .json('User has been signed out');

    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req,res,next) => {
    if(!req.user.isAdmin) {
        res.status(errorHandler(403, 'You are allowed to access the all the Users'));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 0;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const users = await User.find()
        .sort({createdAt: sortDirection})
        .skip(startIndex)
        .limit(limit);

        const totalUsers = users.map((user) =>{
            const { password, ...rest} = user._doc;
            return rest;
        });
        const usersCount = await User.countDocuments();
         const now = new Date();

         const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
         );

         const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo},
         });

         res.status(200).json({
            users: totalUsers,
            usersCount,
            lastMonthUsers
         });
    } catch (error) {
        next(error);
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};
