const { v4: uuidv4, stringify } = require('uuid');
const { response } = require('../middleware/common');
const  ModelComment = require('../models/comment')

const CommentController = {
    getComment : (req,res,next) => {
        const limit = Number(req.query.limit) || 10
        ModelComment.selectComment(limit)
        .then(result => response(res,200,true,result.rows,'get data succes from comment'))
        .catch(err => response(res,401,false,err,'get data fail'))
    },
    getCommentById : (req,res,next) => {
        const limit = Number(req.query.limit) || 10
        let recipe_id = req.params.recipe_id
        ModelComment.selectCommentId(limit,recipe_id)
        .then(result => response(res,200,true,result.rows,'get data succes from comment'))
        .catch(err => response(res,401,false,err,'get data fail'))
    },

    insert :  (req,res) => {
        let data = {
            id : uuidv4(),
            comment :  req.body.comment,
            user_recipe_id :  req.body.user_recipe_id,
            recipe_id : req.body.recipe_id
        }
        ModelComment.insertComment(data)
        .then(result => response(res,200,true,result.rows,'insert data succes'))
        .catch(err => response(res,401,false,err,'insert data fail'))
        console.log(data)
    },

}


exports.CommentController = CommentController
