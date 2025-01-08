const express = require('express');
const { getUserById } = require('../controllers/userController');

const router = express.Router();

router.get("/", (req, res) => res.status(200).json('Welcome, User Route is working well'));
router.get('/:id', getUserById);

module.exports = router;