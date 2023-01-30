const Pool = require ('../config/db');

const selectRecipe = ({limit,offset,sort,sortby,search, page}) => {
    return Pool.query(`SELECT * FROM recipe ORDER BY recipe.${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}
const selectRecipeById = (id) => {
    return Pool.query(`SELECT recipe.id,recipe.title,recipe.vidio,recipe.photo,recipe.ingredients,recipe.description FROM recipe WHERE recipe.id='${id}' `);  
}
const deleteRecipe = (id) => {
    return Pool.query(`DELETE FROM recipe WHERE recipe.id='${id}'`);  
}
const insertRecipe = (data) => {
    const {title,vidio,photo,ingredients,description,user_recipe_id} = data;
    return Pool.query(`INSERT INTO recipe(title,vidio,photo,ingredients,description,user_recipe_id) VALUES('${title}','${vidio}','${photo}','${ingredients}','${description}','${user_recipe_id}')`);
    console.log(data,"odal")  
}
const selectUser = ({limit,offset,sort,sortby,search, page,user_rec}) => {
    return Pool.query(`SELECT recipe.id,recipe.title,recipe.ingredients,recipe.vidio,recipe.photo,recipe.description,user_rec.id as user_recipe_id FROM recipe INNER JOIN user_rec ON recipe.user_recipe_id = user_rec.id WHERE user_rec.id='${user_rec}'`);
}

module.exports = {selectRecipeById, selectRecipe, insertRecipe, deleteRecipe,selectUser}