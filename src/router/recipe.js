const express = require('express');
const router = express.Router();
const {recipeController} = require('../controller/recipe');
const upload = require('../middleware/upload');
const {protect} = require ('../middleware/auth');

router.get('/',recipeController.getRecipe);
router.get('/',protect,recipeController.getRecipe);
router.get('/user',protect,recipeController.getRecipeUser);
router.get('/user',recipeController.getRecipeUser);
router.get('/:id',recipeController.getRecipeDetail);
router.delete('/:id',protect,recipeController.delete);
router.post('/',protect,upload.single("photo"),recipeController.insert);
router.post('/tt',protect,upload.single("photo"),recipeController.insertt)
module.exports = router;