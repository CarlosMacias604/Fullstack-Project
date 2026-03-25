// Comment routes - mounted under /api
const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const validate = require('../Middlewares/validation');
const commentController = require('../Controllers/commentController');
const authMiddleware = require('../Middlewares/auth');

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   get:
 *     summary: Get all comments for a post with pagination
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/posts/:postId/comments', [
    param('postId').isMongoId().withMessage('Invalid post ID'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], validate, commentController.getComments);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Get a single comment by ID
 *     tags:
 *       - Comments
 */
router.get('/comments/:id', [
    param('id').isMongoId().withMessage('Invalid comment ID'),
], validate, commentController.getComment);

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Create a new comment on a post
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 */
router.post('/posts/:postId/comments', [
    param('postId').isMongoId().withMessage('Invalid post ID'),
    body('content').notEmpty().withMessage('Content is required'),
], validate, authMiddleware, commentController.createComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 */
router.put('/comments/:id', [
    param('id').isMongoId().withMessage('Invalid comment ID'),
    body('content').notEmpty().withMessage('Content is required'),
], validate, authMiddleware, commentController.updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 */
router.delete('/comments/:id', [
    param('id').isMongoId().withMessage('Invalid comment ID'),
], validate, authMiddleware, commentController.deleteComment);

module.exports = router;
