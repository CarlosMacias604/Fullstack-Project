// Main Express application configuration
const express = require('express');
const connectDB = require('./Config/database');
const cors = require('cors');

// Import routes
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const postRoutes = require('./Routes/postRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const commentRoutes = require('./Routes/commentRoutes');
const likeRoutes = require('./Routes/likeRoutes');

//Import middleware
const swaggerMiddleware = require('./Middlewares/swagger');
const errorHandler = require('./Middlewares/errorHandler');

const app = express();

app.use(cors({
    origin: process.env.PWA_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

connectDB();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Hi API PostSpace!');
});

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', categoryRoutes);
app.use('/api', commentRoutes);
app.use('/api', likeRoutes);

//Swagger
swaggerMiddleware(app);

//error handler
app.use(errorHandler);

module.exports = app;