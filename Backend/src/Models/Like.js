// Like model: defines data structure for likes on posts
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Unique index to prevent duplicate likes from same user on same post
likeSchema.index({ user: 1, post: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
