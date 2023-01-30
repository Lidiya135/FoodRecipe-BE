const Pool = require("../config/db");

const create = (data) => {
    const {email,password,fullname,phone} = data
    return new Promise ((resolve,reject)=>
        Pool.query(`INSERT INTO user_rec(email,password,fullname,phone)VALUES('${email}','${password}','${fullname}','${phone}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const findEmail = (email) => {
    return new Promise((resolve, reject) => 
    Pool.query(`SELECT * FROM user_rec where email='${email}'`,(err,result)=>{
        if(!err){
            resolve(result)
        } else {
            reject(err)
        }
    }))
}
const updateUser = (id, data) =>{   
    const {fullname, photo} = data;
    return new Promise((resolve, reject) => 
    Pool.query(`UPDATE user_rec SET fullname='${fullname}',photo='${photo}' WHERE id='${id}'`,(err,result)=>{
        if(!err){
            resolve(result)
        } else {
            reject(err)
        }
    }))
}

const getDataId = (id) => {
    return new Promise((resolve, reject) => 
    Pool.query(`SELECT * FROM user_rec WHERE user_rec.id='${id}'`,(err,result)=>{
        if(!err){
            resolve(result)
        } else {
            reject(err)
        }
    }))
}

const getData = () => {
    return new Promise((resolve, reject) => 
    Pool.query(`SELECT * FROM user_rec`,(err,result)=>{
        if(!err){
            resolve(result)
        } else {
            reject(err)
        }
    }))
}

module.exports = {create,findEmail,updateUser,getDataId, getData}