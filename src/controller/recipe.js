/* eslint-disable no-unused-vars */
const { response } = require('../middleware/common');
const  ModelRecipe = require('../models/recipe')
const { v4: uuidv4, stringify } = require('uuid'); 
const cloudinary = require('../config/cloudinary');

const recipeController = {
    getRecipe : (req,res,next) => {
        ModelRecipe.selectRecipe()
        .then(result => response(res,200,true,result.rows,'get data succes'))
        .catch(err => response(res,401,false,err.message,'get data fail'))
    },
    getRecipee : (req,res,next) => {
        const sortby = req.query.sortby || "id" ;
        const sort = req.query.sort || "asc";
        const search = req.query.search || '';
        const page = req.query.page || 1 ;
        const limit = req.query.limit || 6 ;
        
        ModelRecipe.selectRecipee(sortby,sort,search,page,limit )
        .then((result) => response(res,200,true,result.rows,'get data succes'))
        .catch((err) => response(res,401,false,err.message,'get data fail'))
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
    // insert :  (req,res,next) => {
    //     console.log(req.body,"req body post recipe")
    //     const Port = process.env.PORT;
    //     const Host = process.env.HOST;
    //     const photo = req.file.filename;
    //     console.log(photo);
    //     const uri = `http://${Host}:${Port}/img/${photo}`;
    //     console.log(uri)
    //     const id =  uuidv4()
    //     const data = {
    //         id,
    //         photo:  uri,
    //         title : req.body.title,
    //         ingredients : req.body.ingredients,
    //         description : req.body.description,
    //         user_recipe_id : req.payload.id,
    //         vidio : req.body.vidio
    //     }
    //     console.log(data)
    //     ModelRecipe.insertRecipe(data)
    //     .then(result => response(res,200,true,result.rows,'insert data succes'))
    //     .catch(err => response(res,401,false,err.message,'insert data fail'))
    // },

    insert : async (req,res,next) => {
        const id =  uuidv4()
        const data = {
            id,
            title : req.body.title,
            ingredients : req.body.ingredients,
            vidio : req.body.vidio,
            description : req.body.description,
            user_recipe_id : req.payload.id   
        }
        if (req.file) {
            const image = await cloudinary.uploader.upload(req.file.path, {
              folder: 'recipe_food',
            });
    
            data.photo = image.url;
          } else {
            data.photo = users.photo;
          }
          
        console.log(data)
        ModelRecipe.insertRecipe(data)
        .then(result => response(res,200,true,result.rows,'update data succes'))
        .catch(err => response(res,401,false,err,'update data fail'))
    },

    // update :  (req,res,next) => {
    //     console.log(req.body,"req body put recipe")
    //     const Port = process.env.PORT;
    //     const Host = process.env.HOST;
    //     const photo = req.file.filename;
    //     console.log(photo,"consol poto");
    //     const uri = `http://${Host}:${Port}/img/${photo}`;
    //     console.log(uri)
    //     // const id =  uuidv4();
    //     const id = req.params.id;
    //     const data = {
    //         title : req.body.title,
    //         ingredients : req.body.ingredients,
    //         vidio : req.body.vidio,
    //         photo:  uri,
    //     }
    //     console.log(data)
    //     ModelRecipe.updateRecipe(id, data)
    //     .then((result) => response(res,200,true,result.rows,'update recipe data succes'))
    //     .catch((err) => response(res,401,false,err.message,'update recipe data fail'))
    // },

    update : async (req,res,next) => {
        const id = req.params.id;
        const data = {
            title : req.body.title,
            ingredients : req.body.ingredients,
            vidio : req.body.vidio,  
        }
        if (req.file) {
            const image = await cloudinary.uploader.upload(req.file.path, {
              folder: 'recipe_food',
            });
    
            data.photo = image.url;
          } else {
            data.photo = users.photo;
          }
          
        console.log(data)
        ModelRecipe.updateRecipe(id, data)
        .then(result => response(res,200,true,result.rows,'insert data sukses'))
        .catch(err => response(res,401,false,err,'insert data fail'))
    },


    
}


exports.recipeController = recipeController

