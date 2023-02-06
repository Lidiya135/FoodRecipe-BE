const {response} = require('../middleware/common');
const {create, findEmail, updateUser, getDataId, getData} = require('../models/user');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } =  require('uuid');
const {generateToken, genRefreshToken} = require('../helper/auth');
const  ModelUsers = require('../models/user');
const cloudinary = require('../config/cloudinary')

const UsersController = {
    insert: async  (req, res, next) => {
    //tanpa uuid dan bcrypt
        // let {rows:[users]} = await findEmail(req.body.email)

        // if(users){
        //     return response(res, 404, false, "email already use"," register fail") 
        // }

        let {rows:[user_rec]} = await findEmail(req.body.email)
        // console.log('role',req.params.role)
        // let role = req.params.role

        if(user_rec){
            return response(res, 404, false, "email already use"," register fail") 
        }
        
        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password);
        let data = {
            id: uuidv4(),
            id : req.body.id,
            email : req.body.email,
            password ,
            fullname : req.body.fullname,
            phone : req.body.phone
        }
        console.log("data dr register", data)
        // res.send(data)
        try{
            const result = await create(data)
            if(result){
                console.log(result)
                response(res, 200, true, true, "register success")
            }
        } catch(err){
            console.log(err)
            response(res, 404, false, err," register fail")
        }
    },

    login: async (req,res,next)=>{
        console.log('email',req.body.email)
        console.log('password',req.body.password)
        let {rows:[user_rec]} = await findEmail(req.body.email)
        if(!user_rec){
            return response(res, 404, false, null," email not found")
        }
        const password = req.body.password
        const validation = bcrypt.compareSync(password,user_rec.password)
        if(!validation){
            return response(res, 404, false, null,"wrong password")
        }
        delete user_rec.password
        let payload = {
            id: user_rec.id,
            email: user_rec.email,
            fullname: user_rec.fullname,
            phone: user_rec.phone
        }
        user_rec.token = generateToken(payload)
        user_rec.refreshToken = genRefreshToken(payload)
        response(res, 200, false, user_rec,"login success")
    },

    getUserId: async (req, res) => {
        try {
          const id = req.payload.id;
          console.log(id,"paload id");
          const result = await getDataId(id);
          response(res, 200, true, result.rows, "Success Get User By tokn");
        } catch (error) {
          response(res, 400, false, error, "Get User By token Fail");
        }
      },
    
    getUser : async (req,res,next) => { 
        ModelUsers.getData(req.params)
        .then((result)=> response(res, 200, true, result.rows, "Get data success"))
        .catch((err)=> response(res, 404, false, err, "Get data fail"))
    },

    // update:(req,res,next) => {
    //     const Port = process.env.PORT;
    //     const Host = process.env.HOST;
    //         // console.log(req.body)
    //     const photo = req.file.filename;
    //     console.log(photo,"filename photo")
    //         const id = req.payload.id;
    //         console.log(id, "id payload")
    //     const uri = `http://${Host}:${Port}/img/${photo}`
    //     req.body.photo = uri
    //         // console.log(uri, "photooo uri")
    //         console.log(req.body)
    //     ModelUsers.updateUser(id,req.body)
    //     .then((result)=> response(res, 200, true, result.rows, "update data success"))
    //     .catch((err)=> response(res, 404, false, err, "update data fail"))
    //   },

    update: async (req, res, next) => {
        try {
            const id = req.payload.id;
            
              if (req.file) {
                const image = await cloudinary.uploader.upload(req.file.path, {
                  folder: 'recipe_food',
                });
        
                req.body.photo = image.url;
              } else {
                req.body.photo = users.photo;
              }
        
            const updateDataUser = await updateUser(id, req.body)
            console.log(req.body)
            response(res, 200, true, updateDataUser.rows, 'update users success')
        } catch (err) {
            response(res, 404, false, err.message, 'update users fail ')
        }
    },
}




exports.UsersController = UsersController;