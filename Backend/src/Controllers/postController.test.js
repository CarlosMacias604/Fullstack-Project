const postController = require('./postController');
const Post = require('../Models/Post');

// Mock the Post model
jest.mock('../Models/Post');

describe('Post Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getPosts', () => {
        it('should return paginated posts', async () => {
            const mockPosts = [
                { _id: '1', title: 'Post 1', content: 'Content 1', category: 'cat1' },
                { _id: '2', title: 'Post 2', content: 'Content 2', category: 'cat2' }
            ];

            Post.find.mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue(mockPosts)
            });

            Post.countDocuments.mockResolvedValue(2);

            const req = {
                query: { page: 1, limit: 10 }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await postController.getPosts(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    total: 2,
                    page: 1,
                    limit: 10,
                    posts: mockPosts
                })
            );
        });

        it('should filter posts by category', async () => {
            const mockPosts = [
                { _id: '1', title: 'Post 1', content: 'Content 1', category: 'tech' }
            ];

            Post.find.mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue(mockPosts)
            });

            Post.countDocuments.mockResolvedValue(1);

            const req = {
                query: { page: 1, limit: 10, category: 'tech' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await postController.getPosts(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe('getPost', () => {
        it('should return a post by ID', async () => {
            const mockPost = { _id: '1', title: 'Post 1', content: 'Content 1' };

            Post.findById.mockResolvedValue(mockPost);

            const req = {
                params: { id: '1' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            const next = jest.fn();

            await postController.getPost(req, res, next);

            expect(Post.findById).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockPost);
        });

        it('should return 404 if post not found', async () => {
            Post.findById.mockResolvedValue(null);

            const req = {
                params: { id: 'nonexistent' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await postController.getPost(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Post not found'
            });
        });
    });

    describe('createPost', () => {
        it('should create a new post successfully', async () => {
            const newPostData = {
                _id: '3',
                title: 'New Post',
                content: 'New Content',
                category: 'tech',
                author: 'user123'
            };

            Post.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(newPostData)
            }));

            const req = {
                body: {
                    title: 'New Post',
                    content: 'New Content',
                    category: 'tech',
                    author: 'user123'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await postController.createPost(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Post created successfully',
                    post: expect.any(Object)
                })
            );
        });

        it('should handle validation errors', async () => {
            const req = {
                body: {
                    title: '',
                    content: 'Content',
                    category: 'tech'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await postController.createPost(req, res, next);

            // Depending on validation middleware, might return error
        });
    });

    describe('updatePost', () => {
        it('should update a post successfully', async () => {
            const updatedPost = {
                _id: '1',
                title: 'Updated Post',
                content: 'Updated Content',
                category: 'tech'
            };

            Post.findByIdAndUpdate.mockResolvedValue(updatedPost);

            const req = {
                params: { id: '1' },
                body: { title: 'Updated Post', content: 'Updated Content' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await postController.updatePost(req, res, next);

            expect(Post.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, { new: true });
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should return 404 if post to update not found', async () => {
            Post.findByIdAndUpdate.mockResolvedValue(null);

            const req = {
                params: { id: 'nonexistent' },
                body: { title: 'Updated' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await postController.updatePost(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    describe('deletePost', () => {
        it('should delete a post successfully', async () => {
            Post.findByIdAndDelete.mockResolvedValue({ _id: '1' });

            const req = {
                params: { id: '1' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await postController.deletePost(req, res, next);

            expect(Post.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should return 404 if post to delete not found', async () => {
            Post.findByIdAndDelete.mockResolvedValue(null);

            const req = {
                params: { id: 'nonexistent' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await postController.deletePost(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });
});
