// Like routes - mounted under /api
const express = require('express');
const router = express.Router();
const { param } = require('express-validator');
const validate = require('../Middlewares/validation');
const likeController = require('../Controllers/likeController');
const authMiddleware = require('../Middlewares/auth');

/**
 * @swagger
 * /api/posts/{postId}/like:
 *   post:
 *     summary: Add a like to a post
 *     tags:
 *       - Likes
 *     security:
 *       - bearerAuth: []
 */
router.post('/posts/:postId/like', [
    param('postId').isMongoId().withMessage('Invalid post ID'),
], validate, authMiddleware, likeController.addLike);

/**
 * @swagger
 * /api/posts/{postId}/like:
 *   delete:
 *     summary: Remove a like from a post
 *     tags:
 *       - Likes
 *     security:
 *       - bearerAuth: []
 */
router.delete('/posts/:postId/like', [
    param('postId').isMongoId().withMessage('Invalid post ID'),
], validate, authMiddleware, likeController.removeLike);

/**
 * @swagger
 * /api/posts/{postId}/likes:
 *   get:
 *     summary: Get like count and user like status for a post
 *     tags:
 *       - Likes
 *     security:
 *       - bearerAuth: []
 */
router.get('/posts/:postId/likes', [
    param('postId').isMongoId().withMessage('Invalid post ID'),
], validate, authMiddleware, likeController.getLikeStatus);

module.exports = router;
