// Server entry point
const app = require('./app');
const seedCategories = require('./Config/seedCategories');
const seedAdmin = require('./Config/seedAdmin');

const port = process.env.PORT || 3001;

// Start server on specified port
const server = app.listen(port, async () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`📚 Swagger docs available at http://localhost:${port}/swagger`);

    // Seed database with default categories and admin user
    await seedCategories();
    await seedAdmin();
});