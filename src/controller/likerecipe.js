const { v4: uuidv4, stringify } = require('uuid');
const { response } = require('../middleware/common');
const  ModelLike = require('../models/likeRecipe')

const LikeController = {    
    get : (req,res,next) => {
        const limit = Number(req.query.limit) || 5
        const user_recipe = req.payload.id
        ModelLike.selectData(limit,user_recipe)
        .then(result => response(res,200,true,result.rows,'get data sukses dari liked'))
        .catch(err => response(res,401,false,err,'get data fail'))
    },
    delete: (req,res,next) => {
        ModelLike.deleteData(req.params.id)
        .then(result => response(res,200,true,result.rows,'delete data succes'))
        .catch(err => response(res,401,false,err,'delete data fail'))
    },
    insert :  (req,res,next) => {
        let data = {
            id : uuidv4(),
            recipe_id : req.body.recipe_id,
            user_recipe_id : req.body.user_recipe_id
        }
        ModelLike.insertData(data)
        .then(result => response(res,200,true,result.rows,'insert data succes'))
        .catch(err => response(res,401,false,err,'insert data fail'))
        console.log(data)
    },
    
}


exports.LikeController = LikeController

