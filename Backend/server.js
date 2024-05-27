const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
const lectureRoutes = require('./routes/lectureRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/api/lectures', lectureRoutes);
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
