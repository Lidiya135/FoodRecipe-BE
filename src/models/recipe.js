const Pool = require ('../config/db');

const selectRecipe = () => {
    return Pool.query(`SELECT * FROM recipe`);
}
const selectRecipee = (page,search,sortby,sort,limit ) => {
    new Promise((resolve, reject) => {
    const offset = (page - 1) * limit;
    Pool.query(`select * FROM recipe where (title) ilike '%${search}%' order by ${sortby} ${sort} limit ${limit} offset ${offset}`
)})}

const selectRecipeById = (id) => {
    return Pool.query(`SELECT recipe.id,recipe.title,recipe.vidio,recipe.photo,recipe.ingredients,recipe.description FROM recipe WHERE recipe.id='${id}' `);  
}
const deleteRecipe = (id) => {
    return Pool.query(`DELETE FROM recipe WHERE recipe.id='${id}'`);  
}
const insertRecipe = (data) => {
    const {title,vidio,photo,ingredients,description,user_recipe_id} = data; 
    console.log(data,"modal") 
    return Pool.query(`INSERT INTO recipe(title,vidio,photo,ingredients,description,user_recipe_id) VALUES('${title}','${vidio}','${photo}','${ingredients}','${description}','${user_recipe_id}')`);
    
}
const selectUser = ({limit,offset,sort,sortby,search, page,user_rec}) => {
    return Pool.query(`SELECT recipe.id,recipe.title,recipe.ingredients,recipe.vidio,recipe.photo,recipe.description,user_rec.id as user_recipe_id FROM recipe INNER JOIN user_rec ON recipe.user_recipe_id = user_rec.id WHERE user_rec.id='${user_rec}'`);
}

const updateRecipe = (id, data) => {
    const { title, ingredients, photo, vidio } = data;
    // console.log(data,"modal") 
    return new Promise((resolve, reject) => {
      Pool.query(
        `UPDATE recipe SET title='${title}',ingredients='${ingredients}',photo='${photo}',vidio='${vidio}' WHERE id='${id}'`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  };
module.exports = {selectRecipeById, selectRecipe, selectRecipee, insertRecipe, deleteRecipe,selectUser, updateRecipe}