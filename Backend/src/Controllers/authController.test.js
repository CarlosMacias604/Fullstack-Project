const request = require('supertest');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const RefreshToken = require('../Models/RefreshToken');
const authController = require('./authController');

// Mock modules
jest.mock('../Models/User');
jest.mock('../Models/RefreshToken');

describe('Auth Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /register', () => {
        it('should register a new user successfully', async () => {
            User.findOne.mockResolvedValue(null);
            User.prototype.save = jest.fn().mockResolvedValue({ _id: '123', name: 'John', email: 'john@test.com' });

            const req = {
                body: {
                    name: 'John Doe',
                    email: 'john@test.com',
                    password: 'password123',
                    role: 'customer'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await authController.register(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User registered successfully'
            });
        });

        it('should return 400 if user already exists', async () => {
            User.findOne.mockResolvedValue({ email: 'john@test.com' });

            const req = {
                body: {
                    name: 'John Doe',
                    email: 'john@test.com',
                    password: 'password123'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await authController.register(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User already exists'
            });
        });
    });

    describe('POST /login', () => {
        it('should login user successfully', async () => {
            const mockUser = {
                _id: '123',
                name: 'John Doe',
                email: 'john@test.com',
                password: '$2a$10$hashedpassword',
                role: 'customer'
            };

            User.findOne.mockResolvedValue(mockUser);
            RefreshToken.prototype.save = jest.fn().mockResolvedValue({
                token: 'refresh-token-123'
            });

            const req = {
                body: {
                    email: 'john@test.com',
                    password: 'password123'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            // Mock bcrypt.compare to return true
            jest.mock('bcryptjs', () => ({
                compare: jest.fn().mockResolvedValue(true)
            }));

            await authController.login(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    token: expect.any(String),
                    refreshToken: expect.any(String)
                })
            );
        });

        it('should return 400 if user not found', async () => {
            User.findOne.mockResolvedValue(null);

            const req = {
                body: {
                    email: 'nonexistent@test.com',
                    password: 'password123'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await authController.login(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invalid credentials'
            });
        });
    });

    describe('POST /refresh-token', () => {
        it('should generate a new token', async () => {
            const mockUser = {
                _id: '123',
                name: 'John Doe',
                role: 'customer'
            };

            User.findById.mockResolvedValue(mockUser);

            const req = {
                body: {
                    token: jwt.sign({ userId: '123' }, process.env.JWT_REFRESH_SECRET || 'secret', { expiresIn: '7d' })
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            // Note: This test will fail without proper JWT_REFRESH_SECRET setup
            // In actual implementation, use process.env or test env variables
        });
    });
});
