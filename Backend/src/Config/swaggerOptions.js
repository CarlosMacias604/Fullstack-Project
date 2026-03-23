const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PostSpace API',
            version: '1.0.0',
            description: 'API for PostSpace management - A platform for creating and sharing posts',
            contact: {
                name: 'API Support',
                email: 'support@postspace.com',
            },
        },
        servers: [
            {
                url: process.env.SWAGGER_SERVER_URL || 'http://localhost:3001',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT token for authentication',
                },
            },
            schemas: {
                /**
                 * @swagger
                 * components:
                 *   schemas:
                 *     User:
                 *       type: object
                 *       properties:
                 *         _id:
                 *           type: string
                 *           description: User ID (MongoDB ObjectId)
                 *         name:
                 *           type: string
                 *           description: User full name
                 *         email:
                 *           type: string
                 *           format: email
                 *           description: User email address
                 *         password:
                 *           type: string
                 *           description: Encrypted password
                 *         role:
                 *           type: string
                 *           enum: [host, admin]
                 *           description: User role
                 *       required:
                 *         - name
                 *         - email
                 *         - password
                 *         - role
                 */
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string' },
                        role: { type: 'string', enum: ['host', 'admin'] },
                    },
                },
                /**
                 * @swagger
                 * components:
                 *   schemas:
                 *     Post:
                 *       type: object
                 *       properties:
                 *         _id:
                 *           type: string
                 *           description: Post ID (MongoDB ObjectId)
                 *         title:
                 *           type: string
                 *           description: Post title
                 *         content:
                 *           type: string
                 *           description: Post content/body
                 *         image:
                 *           type: string
                 *           description: Post image URL (optional)
                 *         author:
                 *           type: string
                 *           description: User ID of the post author
                 *         category:
                 *           type: string
                 *           description: Category ID for the post
                 *         createdAt:
                 *           type: string
                 *           format: date-time
                 *           description: Post creation timestamp
                 *       required:
                 *         - title
                 *         - content
                 *         - author
                 *         - category
                 */
                Post: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        title: { type: 'string' },
                        content: { type: 'string' },
                        image: { type: 'string' },
                        author: { type: 'string' },
                        category: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
                /**
                 * @swagger
                 * components:
                 *   schemas:
                 *     Category:
                 *       type: object
                 *       properties:
                 *         _id:
                 *           type: string
                 *           description: Category ID (MongoDB ObjectId)
                 *         name:
                 *           type: string
                 *           description: Category name
                 *       required:
                 *         - name
                 */
                Category: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js', './src/models/*.js'],
};

const swaggerDocs = swaggerJsdoc(options);
module.exports = swaggerDocs;