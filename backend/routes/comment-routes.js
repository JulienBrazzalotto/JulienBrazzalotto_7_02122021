const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment-controllers');

router.post('/', commentCtrl.createComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment)
router.get('/', commentCtrl.getAllComment)
router.get('/:id', commentCtrl.getOneComment)

module.exports = router;