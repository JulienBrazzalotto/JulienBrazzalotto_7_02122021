const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post-controllers');

router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost)
router.get('/', postCtrl.getAllPosts)
router.get('/:id', postCtrl.getOnePost)

module.exports = router;