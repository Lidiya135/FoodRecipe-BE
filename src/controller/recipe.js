/* eslint-disable no-unused-vars */
const { response } = require('../middleware/common');
const  ModelRecipe = require('../models/recipe')
const { v4: uuidv4, stringify } = require('uuid'); //membuat id unik


const recipeController = {
    getRecipe : (req,res,next) => {
        const sortby = req.query.sortby || "id" ;
        const sort = req.query.sort || "DESC";
        const search = req.query.search || '';
        const page = Number(req.query.page) || 1 ;
        const limit = Number(req.query.limit) || 10 ;
        const offset = (page - 1) * limit ;
        
        ModelRecipe.selectRecipe({limit,offset,sort,sortby,search,page })
        .then(result => response(res,200,true,result.rows,'get data succes'))
        .catch(err => response(res,401,false,err.message,'get data fail'))
    },
    getRecipeUser : (req,res,next) => {
        const sortby = req.query.sortby || "id" ;
        const sort = req.query.sort || "DESC";
        const search = req.query.search || '';
        const user_rec = req.payload.id;
        const page = Number(req.query.page) || 1 ;
        const limit = Number(req.query.limit) || 10 ;
        const offset = (page - 1) * limit ;
        
        ModelRecipe.selectUser({limit,offset,sort,sortby,search,page,user_rec })
        .then(result => response(res,200,true,result.rows,'get data succes'))
        .catch(err => response(res,401,false,err.message,'get data fail'))
    },
    getRecipeDetail : (req,res,next) => {
        ModelRecipe.selectRecipeById(req.params.id)
        .then(result => response(res,200,true,result.rows,'get data sukses'))
        .catch(err => response(res,401,false,err,'get data fail'))
    },
    delete: (req,res,next) => {
        ModelRecipe.deleteRecipe(req.params.id)
        .then(result => response(res,200,true,result.rows,'delete data succes'))
        .catch(err => response(res,401,false,err,'delete data fail'))
    },
    insert :  (req,res,next) => {
        console.log(req.body,"req body post recipe")
        const Port = process.env.PORT;
        const Host = process.env.HOST;
        const photo = req.file.filename;
        console.log(photo);
        const uri = `http://${Host}:${Port}/img/${photo}`;
        console.log(uri)
        const id =  uuidv4()
        const data = {
            id,
            photo:  uri,
            title : req.body.title,
            ingredients : req.body.ingredients,
            description : req.body.description,
            user_recipe_id : req.body.user_recipe_id,
            vidio : req.body.vidio
        }
        console.log(data)
        ModelRecipe.insertRecipe(data)
        .then(result => response(res,200,true,result.rows,'insert data succes'))
        .catch(err => response(res,401,false,err.message,'insert data fail'))
    },

    insertt: async (req, res) => {
        ModelRecipe.insertRecipe(req.body)
        .then((result)=> response(res, 200, true, result.rows, "INPUT RECIPE SUCCESS"))
        .catch((err)=> response(res, 404, false, err, "INPUT RECIPE FAILED"))
      },
    
}


exports.recipeController = recipeController

