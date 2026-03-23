// Server entry point
const app = require('./app');

const port = process.env.PORT || 3001;

// Start server on specified port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});