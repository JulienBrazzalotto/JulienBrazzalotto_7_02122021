const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment-controllers');
const auth = require('../middleware/auth')

router.post('/',auth, commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment)
router.get('/:post_id', auth, commentCtrl.getAllComments)

module.exports = router;