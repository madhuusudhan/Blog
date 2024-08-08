import { errorHandler } from "../utils/error.js"
import Post from "../models/postModel.js"

export const create = async (req, res, next) => {
    // console.log(req.user);
       if(!req.user.isAdmin) {
        return next(errorHandler(403,'You are not allowed to create post'))
       }
       if(!req.body.title || !req.body.content) {
        return next(errorHandler(400,'Please provide all the fields'))
       }
       const slug = req.body.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
       const newPost = new Post({
           ...req.body, slug, userId: req.user.id
       });
       try {
            const savedPost = await newPost.save();
            res.status(201).json({savedPost});
       } catch (error) {
           next(error);
       }
}

export const getPosts = async (req, res, next) => {
        try {
            const startIndex = parseInt(req.query.startIndex) || 0;
            const limit = parseInt(req.query.limit) || 9;
            const sortDirection = req.query.order === 'asc' ? 1 : -1;
            const posts = await Post.find(
                {
                    ...(req.query.userId && {userId: req.query.userId}),
                    ...(req.query.category && {category: req.query.category}),
                    ...(req.query.slug && {slug: req.query.slug}),
                    ...(req.query.postId && {_id: req.query.postId}),
                    ...(req.query.searchTerm && {
                        $or: [
                            {title: {$regex: req.query.searchTerm, $options: 'i'}},
                            {content: {$regex: req.query.searchTerm, $options: 'i'}},
                        ],
                    }),

                }
            )
            .sort({updatedAt: sortDirection})
            .skip(startIndex)
            .limit(limit);

            const totalPosts = await Post.countDocuments();
            const now = new Date();

            const oneMonthago = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                now.getDate()
            );
            const lastMonthsPosts = await Post.countDocuments({
                createdAt: { $gte: oneMonthago},
            });
            res.status(200).json({
                posts,
                totalPosts,
                lastMonthsPosts,
            });
        } catch (error) {
            next(error);
        }
    
}

export const deletePost = async (req,res,next) => {
    if(!req.user.isAdmin || req.user.id != req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete the post'));
    }
    try {
        const deletePostId = req.params.postId;
        await Post.findByIdAndDelete(deletePostId);
        res.status(200).json('The post has been deleted');
    } catch (error) {
        next(error);
    }
}

export const updatePost = async (req, res, next) => {
    try {
        // Check if the user is authorized to update the post
        if (!req.user.isAdmin || req.user.id !== req.params.userId) {
            return res.status(403).json({ message: 'You are not allowed to update the post' });
        }

        // Find and update the post
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image,
                }
            },
            { new: true } 
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        next(error);
    }
}
