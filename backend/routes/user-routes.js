const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user-controllers');
const multerProfile = require('../middleware/multer-profile')
const auth = require('../middleware/auth')


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', auth, multerProfile, userCtrl.delete);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id',auth, multerProfile, userCtrl.modifyUser);
router.put('/admin/:id',auth, userCtrl.AdminModifyUser)
router.put('/admin/password/:id',auth, userCtrl.AdminModifyPassword)
router.get('/',auth, userCtrl.getAllUsers);
router.put('/profile/:id',auth, userCtrl.modifyPassword)

module.exports = router;
