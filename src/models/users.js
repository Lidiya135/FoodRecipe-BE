const pool = require('../config/db');

const create = (data) => {
  const {
    id_user, email, password, name, phone
  } = data;
  return new Promise((resolve, reject) => pool.query(`INSERT INTO users(id_user,email,password,name,phone) VALUES(${id_user},'${email}','${password}','${name}','${phone}')`, (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  }));
};

const findEmail = (email) => new Promise((resolve, reject) => pool.query(`SELECT * FROM users where email='${email}'`, (err, result) => {
  if (!err) {
    resolve(result);
  } else {
    reject(err);
  }
}));

const insertData = (data) => {
  const {
    id_user, email, name, password, phone,
  } = data;
  return pool.query(`INSERT INTO users(id_user, name, email, password, phone)VALUES('${id_user}', '${email}', '${name}',  '${password}', '${phone}' )`);
};

const updateData = (id, data) => {
  const {
    name, email, password, phone,
  } = data;
  return pool.query(`UPDATE users SET name='${name}', email='${email}', , password='${password}', '${phone}' WHERE id=${id}`);
};

const deleteData = (id) => pool.query(`DELETE FROM users WHERE id='${id}'`);

module.exports = {
  create, findEmail, insertData, updateData, deleteData,
};
