const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user-controllers');
const auth = require('../middleware/auth')


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id',auth, userCtrl.delete);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id',auth, userCtrl.modifyUser);

module.exports = router;
