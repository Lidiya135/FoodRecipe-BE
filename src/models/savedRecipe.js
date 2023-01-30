const Pool =require ('../config/db');

const insertData = (data) => {
    const {recipe_id,user_recipe_id} = data;
    return Pool.query(`INSERT INTO savedrecipe(recipe_id,user_recipe_id) VALUES ('${recipe_id}','${user_recipe_id}')`);  
}
const deleteData = (id) => {
    return Pool.query(`DELETE FROM savedrecipe WHERE savedrecipe.id='${id}'`);  
}
const selectData = (limit,user_recipe_id) => {
    return Pool.query(`SELECT savedrecipe.id,recipe.id as recipe_id,recipe.photo as recipe_photo,recipe.title as recipe_name,user_rec.id as user_recipe_id FROM savedrecipe 
    INNER JOIN recipe ON savedrecipe.recipe_id = recipe.id
    INNER JOIN user_rec ON savedrecipe.user_recipe_id = user_rec.id WHERE savedrecipe.user_recipe_id='${user_recipe_id}'`);
}

module.exports = {insertData,deleteData, selectData}