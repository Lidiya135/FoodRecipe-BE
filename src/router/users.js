const express = require('express');
const router = express.Router();
const {UsersController}= require('../controller/user');
const upload = require('../middleware/upload');
const {protect} = require ('../middleware/auth');

router.post('/register', UsersController.insert);
router.post('/login',UsersController.login);
router.get('/data',protect,UsersController.getUserId);
router.get('/',protect,UsersController.getUser);
router.put('/profile',protect,upload.single("photo"),UsersController.update)


module.exports = router;