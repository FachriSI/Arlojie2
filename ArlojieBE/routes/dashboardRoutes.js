const express = require('express');
const router = express.Router();
// Import the specific function from the controller
const { getDashboardStats } = require('../controllers/adminUserController'); // <-- CHANGE IS HERE
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware'); // assuming these are required

// Define the route using the specific function as a handler
router.get('/dashboard', verifyToken, isAdmin, getDashboardStats); // <-- CHANGE IS HERE

module.exports = router;