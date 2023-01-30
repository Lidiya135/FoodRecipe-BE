const Pool =require ('../config/db')

const selectComment = (limit) => {
    return Pool.query(`SELECT comment.id,comment.comment, user_rec.fullname as user_rec, user_rec.photo as user_recipe_photo,recipe.id as recipe_id FROM comment INNER JOIN user_rec ON comment.user_recipe_id = user_rec.id INNER JOIN recipe ON comment.recipe_id = recipe.id`)
}
const selectCommentId = (limit,recipe_id) => {
    return Pool.query(`SELECT comment.id,comment.comment, user_rec.fullname as user_rec, user_rec.photo as user_recipe_photo,recipe.id as recipe_id FROM comment INNER JOIN user_rec ON comment.user_recipe_id = user_rec.id INNER JOIN recipe ON comment.recipe_id = recipe.id WHERE recipe_id = '${recipe_id}'`);
}
const insertComment = (data) => {
    const {user_recipe_id,comment,recipe_id} = data;
    return Pool.query(`INSERT INTO comment(user_recipe_id,comment,recipe_id) VALUES ('${user_recipe_id}','${comment}','${recipe_id}')`);  
}
 

module.exports = {selectComment, insertComment,selectCommentId}