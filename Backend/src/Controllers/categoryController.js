// Category controller: manages CRUD operations for categories
const Category = require('../Models/Category');
const bcrypt = require('bcryptjs');

// Gets list of categories with pagination
exports.getCategories = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const categories = await Category.find()
            .skip((page - 1) * limit)
            .limit(limit);

        const totalCategories = await Category.countDocuments();

        res.status(200).json({
            total: totalCategories,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            categories
        });
    } catch (error) {
        next(error);
    }
};

// Gets a category by ID
exports.getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category === null) {
            res.status(404).json({ message: 'Category not found' });
        } else {
            res.status(200).send(category);
        }
    } catch (error) {
        next(error);
    }
};


// Creates a new category
exports.createCategory = async (req, res, next) => {
    try {
        const { name, description, ...rest } = req.body;

        // Crear el nuevo category
        const category = new Category({
            ...rest,
            name,
            description
        });

        await category.save();
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        next(error);
    }
};

// Updates category information
exports.updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
        } else {
            res.status(200).send(category);
        }
    } catch (error) {
        next(error);
    }
};

// Deletes a category by ID
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
};