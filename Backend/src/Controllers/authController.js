// Authentication controller: manages registration, login, and refresh token
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const RefreshToken = require('../Models/RefreshToken');

// Generates JWT token valid for 1 hour
const generateToken = (userId, name, role) => jwt.sign({ userId, name, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Checks if user exists by email
const checkUserExists = async (email) => User.findOne({ email });

// Hashes password with bcrypt (10 rounds)
const hashPassword = async (password) => bcrypt.hash(password, 10);

// Creates and saves a 7-day refresh token
const generateRefreshToken = (userId) => {
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return new RefreshToken({ token: refreshToken, userId }).save();
};

// Registers a new user
exports.register = async (req, res, next) => {
    try {
        const {
            name, email, password, role = 'customer',
        } = req.body;

        const existingUser = await checkUserExists(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};

// Authenticates user and returns JWT and refresh token
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await checkUserExists(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id, user.name, user.role);
        const refreshToken = await generateRefreshToken(user._id);

        res.status(200).json({ token, refreshToken: refreshToken.token });
    } catch (error) {
        next(error);
    }
};

// Generates a new JWT using refresh token
exports.refreshToken = async (req, res, next) => {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.userId);
        if (user) {
            const newToken = generateToken(user.userId, user.name, user.role);
            res.status(200).json({ token: newToken });
        } else {
            res.status(401).json({ message: 'Invalid refresh token' });
        }
    } catch (error) {
        next(error);
    }
};