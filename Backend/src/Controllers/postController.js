// Post controller: manages CRUD operations for posts/articles
const Post = require('../Models/Post');
const bcrypt = require('bcryptjs');

// Gets list of posts with pagination
exports.getPosts = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const posts = await Post.find()
            .populate('author', 'name email role')
            .populate('category', 'name')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalPosts = await Post.countDocuments();

        res.status(200).json({
            total: totalPosts,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            posts
        });
    } catch (error) {
        next(error);
    }
};

// Gets a post by ID
exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name email role')
            .populate('category', 'name');

        if (post === null) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.status(200).send(post);
        }
    } catch (error) {
        next(error);
    }
};


// Creates a new post
exports.createPost = async (req, res, next) => {
    try {
        const { title, content, ...rest } = req.body;

        // Crear el nuevo post
        const post = new Post({
            ...rest,
            title,
            content
        });

        await post.save();
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        next(error);
    }
};

// Updates post information
exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.status(200).send(post);
        }
    } catch (error) {
        next(error);
    }
};

// Deletes a post by ID
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
};

// Searches posts by title or content
exports.searchPosts = async (req, res, next) => {
    try {
        const { query, category, page = 1, limit = 10 } = req.query;

        if (!query || query.trim() === '') {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const searchFilter = {
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        };

        if (category) {
            searchFilter.category = category;
        }

        const posts = await Post.find(searchFilter)
            .populate('author', 'name email role')
            .populate('category', 'name')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalPosts = await Post.countDocuments(searchFilter);

        res.status(200).json({
            total: totalPosts,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            query,
            posts
        });
    } catch (error) {
        next(error);
    }
};