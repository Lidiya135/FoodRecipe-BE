const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { response } = require('../middleware/common');
const { create, findEmail } = require('../models/users');
const { generateToken, genRefreshToken } = require('../helper/auth');

const UsersController = {
    insert: async (req, res, next) => {
        const { rows: [users] } = await findEmail(req.body.email);

        if (users) {
            return response(res, 404, false, 'email already use', ' register fail');
        }

        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password);
        const data = {
            id: uuidv4(),
            email: req.body.email,
            password,
            name: req.body.name,
            phone: req.body.phone,
            
        };
        try {
            const result = await create(data);
            if (result) {
                console.log(result);
                response(res, 200, true, true, 'register success');
            }
        } catch (err) {
            console.log(err);
            response(res, 404, false, err, ' register fail');
        }
    },

    login: async (req, res, next) => {
        console.log('email', req.body.email);
        console.log('password', req.body.password);
        const { rows: [users] } = await findEmail(req.body.email);
        if (!users) {
            return response(res, 404, false, null, ' email not found');
        }
        const { password } = req.body;
        const validation = bcrypt.compareSync(password, users.password);
        if (!validation) {
            return response(res, 404, false, null, 'wrong password');
        }
        delete users.password;
        const payload = {
            email: users.email,
        };
        users.token = generateToken(payload);
        users.refreshToken = genRefreshToken(payload);
        response(res, 200, false, users, 'login success');
    },
};

exports.UsersController = UsersController;
