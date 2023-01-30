const Pool =require ('../config/db')

const insertData = (data) => {
    const {recipe_id,user_recipe_id} = data;
    return Pool.query(`INSERT INTO likerecipe(recipe_id,user_recipe_id) VALUES ('${recipe_id}','${user_recipe_id}')`);  
}
const selectIdRecipe = (recipe_id) => {
    Pool.query(`SELECT * FROM recipe_id where recipe_id='${recipe_id}'`)
}
const deleteData = (id) => {
    return Pool.query(`DELETE FROM likerecipe WHERE likerecipe.id='${id}'`);  
}
const selectData = (limit,user_recipe_id) => {
    return Pool.query(`SELECT likerecipe.id,recipe.id as recipe_id,recipe.photo as recipe_photo,recipe.title as recipe_name,user_rec.id as user_recipe_id FROM likeRecipe INNER JOIN recipe ON likerecipe.recipe_id = recipe.id INNER JOIN user_rec ON likerecipe.user_recipe_id = user_rec.id WHERE likerecipe.user_recipe_id='${user_recipe_id}'`);
}

module.exports = {selectData, insertData,deleteData,selectIdRecipe}