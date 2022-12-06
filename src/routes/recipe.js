const express = require("express");
const router = express.Router();
const { recipeController } = require("../controller/recipe");
const upload = require("../middleware/upload");

router.post("/", upload.single("photo"), recipeController.insert);
router.post("/", recipeController.insert);
router.put("/update/:id", upload.single("photo"), recipeController.update);
router.delete("/delete/:id", recipeController.delete);
router.get("/get/:id", recipeController.get);
router.get("/", recipeController.get);

module.exports = router;