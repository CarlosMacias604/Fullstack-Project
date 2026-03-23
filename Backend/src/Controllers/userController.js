// User controller: manages CRUD operations
const User = require('../Models/User');
const bcrypt = require('bcryptjs');

// Gets list of users with pagination
exports.getUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(limit);

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            total: totalUsers,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            users
        });
    } catch (error) {
        next(error);
    }
};

// Gets a user by ID
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user === null) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        next(error);
    }
};


// Creates a new user
exports.createUser = async (req, res, next) => {
    try {
        const { email, password, ...rest } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const user = new User({
            ...rest,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        next(error);
    }
};

// Updates user information
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        next(error);
    }
};

// Deletes a user by ID
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
};