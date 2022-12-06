const Pool = require('../config/db');

const insertRecipe = ({
  name_recipe, photo, video, description, id_user,
}) => new Promise((resolve, reject) => {
  Pool.query(
    `INSERT INTO recipes(name_recipe,photo,video,description,id_user) VALUES ('${name_recipe}','${photo}','${video}','${description}','${id_user}')`,
    (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    },
  );
});

const updateRecipe = (id, {
    name_recipe, photo, video, description,
}) => new Promise((resolve, reject) => {
  Pool.query(
    `UPDATE recipes SET recipes_name='${name_recipe}',photo='${photo}',video='${video}',description='${description}' WHERE id_recipe='${id}'`,
    (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    },
  );
});

const deleteRecipe = (id) => new Promise((resolve, reject) => {
  Pool.query(
    `DELETE FROM recipe WHERE id_recipe='${id}'`,
    (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    },
  );
});

const selectRecipeId = (id) => new Promise((resolve, reject) => {
  Pool.query(
    `SELECT * FROM recipe WHERE id_recipe='${id}'`,
    (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    },
  );
});

// const selectRecipe = () => new Promise((resolve, reject) => {
//   Pool.query(
//     `SELECT * FROM recipe`,
//     (err, result) => {
//       if (!err) {
//         resolve(result);
//       } else {
//         reject(err);
//       }
//     },
//   )
// });

const selectRecipe =()=>{
  return Pool.query(`SELECT * FROM recipe`)
}

module.exports = {
    insertRecipe,
    updateRecipe,
    deleteRecipe,
    selectRecipe,
    selectRecipeId
  };