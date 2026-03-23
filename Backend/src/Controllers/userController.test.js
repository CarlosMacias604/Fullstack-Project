const userController = require('./userController');
const User = require('../Models/User');

// Mock the User model
jest.mock('../Models/User');

describe('User Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getUsers', () => {
        it('should return paginated users', async () => {
            const mockUsers = [
                { _id: '1', name: 'User 1', email: 'user1@test.com' },
                { _id: '2', name: 'User 2', email: 'user2@test.com' }
            ];

            User.find.mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue(mockUsers)
            });

            User.countDocuments.mockResolvedValue(2);

            const req = {
                query: { page: 1, limit: 10 }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await userController.getUsers(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    total: 2,
                    page: 1,
                    limit: 10,
                    users: mockUsers
                })
            );
        });

        it('should use default pagination values', async () => {
            User.find.mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue([])
            });

            User.countDocuments.mockResolvedValue(0);

            const req = {
                query: {}
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await userController.getUsers(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    page: 1,
                    limit: 10
                })
            );
        });
    });

    describe('getUser', () => {
        it('should return a user by ID', async () => {
            const mockUser = { _id: '1', name: 'User 1', email: 'user1@test.com' };

            User.findById.mockResolvedValue(mockUser);

            const req = {
                params: { id: '1' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            const next = jest.fn();

            await userController.getUser(req, res, next);

            expect(User.findById).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 if user not found', async () => {
            User.findById.mockResolvedValue(null);

            const req = {
                params: { id: 'nonexistent' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await userController.getUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User not found'
            });
        });
    });

    describe('createUser', () => {
        it('should create a new user successfully', async () => {
            User.findOne.mockResolvedValue(null);

            const newUserData = {
                _id: '3',
                name: 'New User',
                email: 'newuser@test.com',
                password: 'hashed_password'
            };

            User.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(newUserData)
            }));

            const req = {
                body: {
                    name: 'New User',
                    email: 'newuser@test.com',
                    password: 'password123'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await userController.createUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User created successfully'
                })
            );
        });

        it('should return 400 if user already exists', async () => {
            User.findOne.mockResolvedValue({ email: 'existing@test.com' });

            const req = {
                body: {
                    name: 'New User',
                    email: 'existing@test.com',
                    password: 'password123'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await userController.createUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User already exists'
            });
        });
    });

    describe('updateUser', () => {
        it('should update a user successfully', async () => {
            const updatedUser = { _id: '1', name: 'Updated User', email: 'user1@test.com' };

            User.findByIdAndUpdate.mockResolvedValue(updatedUser);

            const req = {
                params: { id: '1' },
                body: { name: 'Updated User' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await userController.updateUser(req, res, next);

            expect(User.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, { new: true });
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user successfully', async () => {
            User.findByIdAndDelete.mockResolvedValue({ _id: '1' });

            const req = {
                params: { id: '1' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await userController.deleteUser(req, res, next);

            expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});
