// Comment controller: manages CRUD operations for comments
const Comment = require('../Models/Comment');
const Post = require('../Models/Post');

// Gets all comments for a post
exports.getComments = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const comments = await Comment.find({ post: postId })
            .populate('author', 'name email')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalComments = await Comment.countDocuments({ post: postId });

        res.status(200).json({
            total: totalComments,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            comments
        });
    } catch (error) {
        next(error);
    }
};

// Gets a single comment by ID
exports.getComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate('author', 'name email')
            .populate('post', 'title');

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

// Creates a new comment
exports.createComment = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const userId = req.user.userId; // From auth middleware

        // Verify post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = new Comment({
            content,
            author: userId,
            post: postId
        });

        await comment.save();

        // Increment comments count on post
        await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });

        // Populate author info before sending response
        await comment.populate('author', 'name email');

        res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (error) {
        next(error);
    }
};

// Updates a comment
exports.updateComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user.userId; // From auth middleware

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user is comment author
        if (comment.author.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized: can only edit own comments' });
        }

        comment.content = content;
        await comment.save();

        await comment.populate('author', 'name email');

        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (error) {
        next(error);
    }
};

// Deletes a comment
exports.deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId; // From auth middleware

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user is comment author
        if (comment.author.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized: can only delete own comments' });
        }

        const postId = comment.post;
        await Comment.findByIdAndDelete(id);

        // Decrement comments count on post
        await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: -1 } });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
