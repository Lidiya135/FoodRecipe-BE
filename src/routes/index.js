const express = require('express');
const router = express.Router();
const RecipeRouter = require('../routes/recipe');
const UsersRouter = require('../routes/users');

router.use('/recipe', RecipeRouter);
router.use('/users',UsersRouter);

module.exports = router;