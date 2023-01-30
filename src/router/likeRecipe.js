/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const {LikeController} = require('../controller/likerecipe');
const {protect} = require ('../middleware/auth');
const multer = require('multer');
const uploade = multer();

router.get('/',protect,LikeController.get)
// router.get('/:id',protect,LikeController.getId)
router.delete('/:id',protect,LikeController.delete)
router.post('/',protect,uploade.array(),LikeController.insert)
// router.post('/',uploade.array(),LikeController.insert)

module.exports = router;