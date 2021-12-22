const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user-controllers');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', userCtrl.delete)
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.modifyUser)

module.exports = router;
