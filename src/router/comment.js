/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const {CommentController} = require('../controller/comment');
const {protect} = require ('../middleware/auth')
const multer = require('multer');
const uploade = multer();

router.get('/',protect,CommentController.getComment)
router.get('/:recipe_id',CommentController.getCommentById)
router.post('/',protect,uploade.array(),CommentController.insert)


module.exports = router;