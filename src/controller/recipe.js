// require("dotenv").config();
const ModelsRecipe = require("./../models/recipe");
const { response } = require("./../middleware/common");

const recipeController = {
  insert: async (req, res) => {
    ModelsRecipe.insertRecipe(req.body)
    .then((result)=> response(res, 200, true, result.rows, "INPUT RECIPE SUCCESS"))
    .catch((err)=> response(res, 404, false, err, "INPUT RECIPE FAILED"))
  },

  get:(req,res,next) => {
    ModelsRecipe.selectRecipe()
    .then((result)=> response(res, 200, true, result.rows, "GET RECIPE SUCCESS"))
    .catch((err)=> response(res, 404, false, err, "GET RECIPE FAILED"))
  },

  update: async (req, res, next) => {
    
  },

  delete: async (req, res) => {
    ModelsRecipe.deleteRecipe(req.params.id)
    .then((result)=> response(res, 200, true, result.rows, "DELETE RECIPE SUCCESS"))
    .catch((err)=> response(res, 404, false, err, "DELETE RECIPE FAILED"))
  },

}

exports.recipeController = recipeController;