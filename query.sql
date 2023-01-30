-- Active: 1673627125466@@127.0.0.1@5432@postgres@public
CREATE TABLE table_name(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time DATE,
    name VARCHAR(255)
);
COMMENT ON TABLE  IS '';
COMMENT ON COLUMN .name IS '';

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    vidio VARCHAR,
    photo VARCHAR,
    title VARCHAR, 
    ingredients VARCHAR ,
    description VARCHAR, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
ALTER TABLE recipe ADD COLUMN user_recipe_id INT REFERENCES user_rec(id);
AlTER TABLE recipe ADD COLUMN comment_id INT REFERENCES comment(id);
CREATE TABLE user_rec (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    fullname VARCHAR NOT NULL, 
    phone VARCHAR ,
    photo VARCHAR, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
CREATE TABLE  comment (
    id SERIAL PRIMARY KEY,
    comment VARCHAR,
    user_recipe_id INT REFERENCES user_rec(id)
);

ALTER TABLE COMMENT ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE COMMENT ADD COLUMN updated_at TIMESTAMP;
CREATE TABLE likerecipe (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES recipe(id),
    user_recipe_id INT REFERENCES user_rec(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
CREATE TABLE savedrecipe (
    id SERIAL PRIMARY KEY,
    user_recipe_id INT REFERENCES user_rec(id),
    recipe_id INT REFERENCES recipe(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE savedrecipe (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES recipe(id),
    user_recipe_id INT REFERENCES user_rec(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);


SELECT user_rec.id,user_rec.fullname,user_rec.password,user_rec.email,user_rec.phone,user_rec.photo,comment.comment as comment FROM user_rec INNER JOIN comment ON user_rec.comment_id = comment.id;
SELECT comment.id,comment.comment, user_rec.id as user_rec FROM comment INNER JOIN user_rec ON comment.user_recipe_id = user_rec.id;
SELECT likerecipe.id,recipe.id as recipe_id,recipe.photo as recipe_photo,recipe.title as recipe_name,user_rec.id as user_recipe_id FROM likeRecipe 
INNER JOIN recipe ON likerecipe.recipe_id = recipe.id
INNER JOIN user_rec ON likerecipe.user_recipe_id = user_rec.id;
INSERT INTO comment(id,user_recipe_id,comment) VALUES('5','1','ini contoh');

SELECT recipe.id,recipe.title,recipe.ingredients,recipe.vidio,recipe.photo,recipe.description,user_rec.id as user_recipe_id FROM recipe INNER JOIN user_rec ON recipe.user_recipe_id = user_rec.id;

SELECT savedrecipe.id,recipe.id as recipe_id,recipe.photo as recipe_photo,recipe.title as recipe_name,user_rec.id as user_recipe_id FROM savedrecipe 
    INNER JOIN recipe ON savedrecipe.recipe_id = recipe.id
    INNER JOIN user_rec ON savedrecipe.user_recipe_id = user_rec.id;


INSERT INTO user_rec (id,email,password,fullname,phone)VALUES('3','${email}','${password}','${fullname}','${phone}');

INSERT INTO comment(id,user_recipe_id,comment,recipe_id) VALUES( '1','1','${comment}','1');
SELECT comment.id,comment.comment, user_rec.fullname as user_rec, user_rec.photo as user_recipe_photo,recipe.id as recipe_id FROM comment INNER JOIN user_rec ON comment.user_recipe_id = user_rec.id INNER JOIN recipe ON comment.recipe_id = recipe.id;

INSERT INTO recipe(title,vidio,photo,ingredients,description,user_recipe_id) VALUES('${title}','${vidio}','${photo}','${ingredients}','${description}',10);

ALTER TABLE recipe
  RENAME TO ;

  SELECT recipe.id,recipe.title,recipe.ingredients,recipe.photo,recipe.vidio,recipe.description,user_rec.id as user_recipe_id FROM recipe INNER JOIN user_rec ON recipe.user_recipe_id = user_rec.id WHERE user_rec.id=10;