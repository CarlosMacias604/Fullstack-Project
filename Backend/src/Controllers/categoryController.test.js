const categoryController = require('./categoryController');
const Category = require('../Models/Category');

// Mock the Category model
jest.mock('../Models/Category');

describe('Category Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getCategories', () => {
        it('should return paginated categories', async () => {
            const mockCategories = [
                { _id: '1', name: 'Category 1', description: 'Desc 1' },
                { _id: '2', name: 'Category 2', description: 'Desc 2' }
            ];

            Category.find.mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue(mockCategories)
            });

            Category.countDocuments.mockResolvedValue(2);

            const req = {
                query: { page: 1, limit: 10 }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await categoryController.getCategories(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    total: 2,
                    page: 1,
                    limit: 10,
                    categories: mockCategories
                })
            );
        });

        it('should use default pagination values', async () => {
            Category.find.mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue([])
            });

            Category.countDocuments.mockResolvedValue(0);

            const req = {
                query: {}
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await categoryController.getCategories(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    page: 1,
                    limit: 10
                })
            );
        });
    });

    describe('getCategory', () => {
        it('should return a category by ID', async () => {
            const mockCategory = { _id: '1', name: 'Category 1', description: 'Desc 1' };

            Category.findById.mockResolvedValue(mockCategory);

            const req = {
                params: { id: '1' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            const next = jest.fn();

            await categoryController.getCategory(req, res, next);

            expect(Category.findById).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockCategory);
        });

        it('should return 404 if category not found', async () => {
            Category.findById.mockResolvedValue(null);

            const req = {
                params: { id: 'nonexistent' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await categoryController.getCategory(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Category not found'
            });
        });
    });

    describe('createCategory', () => {
        it('should create a new category successfully', async () => {
            const newCategoryData = {
                _id: '3',
                name: 'New Category',
                description: 'New Desc'
            };

            Category.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(newCategoryData)
            }));

            const req = {
                body: {
                    name: 'New Category',
                    description: 'New Desc'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await categoryController.createCategory(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Category created successfully',
                    category: expect.any(Object)
                })
            );
        });

        it('should handle creation errors', async () => {
            Category.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('DB Error'))
            }));

            const req = {
                body: {
                    name: 'New Category',
                    description: 'New Desc'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await categoryController.createCategory(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('updateCategory', () => {
        it('should update a category successfully', async () => {
            const updatedCategory = { _id: '1', name: 'Updated Category', description: 'Updated Desc' };

            Category.findByIdAndUpdate.mockResolvedValue(updatedCategory);

            const req = {
                params: { id: '1' },
                body: { name: 'Updated Category', description: 'Updated Desc' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await categoryController.updateCategory(req, res, next);

            expect(Category.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, { new: true });
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe('deleteCategory', () => {
        it('should delete a category successfully', async () => {
            Category.findByIdAndDelete.mockResolvedValue({ _id: '1' });

            const req = {
                params: { id: '1' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            await categoryController.deleteCategory(req, res, next);

            expect(Category.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});
