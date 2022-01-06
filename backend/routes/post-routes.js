const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post-controllers');
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id',auth, postCtrl.deletePost)
router.get('/', auth, postCtrl.getAllPosts)
router.get('/:id', auth, postCtrl.getOnePost)

module.exports = router;