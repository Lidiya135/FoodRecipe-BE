const express = require('express');
const router = express.Router();
const RecipeRouter = require('../router/recipe');
const UsersRouter = require('../router/users');
const CommentRouter = require('../router/comment');
const LikeRouter = require('../router/likeRecipe');
const SaveRouter = require('../router/savedRecipe');

router.use('/recipe', RecipeRouter);
router.use('/users',UsersRouter);
router.use('/comment',CommentRouter);
router.use('/like',LikeRouter);
router.use('/save',SaveRouter);

module.exports = router;