const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post-controllers');
const multer = require('../middleware/multer-config')

router.post('/',multer, postCtrl.createPost);
router.put('/:id',multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost)
router.get('/', postCtrl.getAllPosts)
router.get('/:id', postCtrl.getOnePost)

module.exports = router;