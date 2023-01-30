/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const {SavedController} = require('../controller/savedRecipe');
const {protect} = require ('../middleware/auth');
const multer = require('multer');
const uploade = multer();

router.get('/',protect,SavedController.get);
router.delete('/:id',protect,SavedController.delete);
router.post('/',protect,uploade.array(),SavedController.insert);


module.exports = router;