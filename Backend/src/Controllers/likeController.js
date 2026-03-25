// Like controller: manages like/unlike operations
const Like = require('../Models/Like');
const Post = require('../Models/Post');

// Add a like to a post (toggle behavior - if already liked, it will fail due to unique constraint)
exports.addLike = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user.userId; // From auth middleware

        // Verify post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user already liked this post
        const existingLike = await Like.findOne({ user: userId, post: postId });
        if (existingLike) {
            return res.status(400).json({ message: 'Post already liked by this user' });
        }

        const like = new Like({
            user: userId,
            post: postId
        });

        await like.save();

        // Increment likes count on post
        await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

        // Get updated likes count
        const updatedPost = await Post.findById(postId);

        res.status(201).json({
            message: 'Like added successfully',
            likes: updatedPost.likes
        });
    } catch (error) {
        next(error);
    }
};

// Remove a like from a post
exports.removeLike = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user.userId; // From auth middleware

        // Verify post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const like = await Like.findOne({ user: userId, post: postId });
        if (!like) {
            return res.status(404).json({ message: 'Like not found' });
        }

        await Like.findByIdAndDelete(like._id);

        // Decrement likes count on post
        await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } });

        // Get updated likes count
        const updatedPost = await Post.findById(postId);

        res.status(200).json({
            message: 'Like removed successfully',
            likes: updatedPost.likes
        });
    } catch (error) {
        next(error);
    }
};

// Get like count and user like status for a post
exports.getLikeStatus = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user?.userId; // Optional, for unauthenticated requests

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        let userLiked = false;
        if (userId) {
            const like = await Like.findOne({ user: userId, post: postId });
            userLiked = !!like;
        }

        res.status(200).json({
            likes: post.likes,
            userLiked
        });
    } catch (error) {
        next(error);
    }
};

// Get total likes count for a post
exports.getLikeCount = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const likeCount = await Like.countDocuments({ post: postId });

        res.status(200).json({ likes: likeCount });
    } catch (error) {
        next(error);
    }
};
