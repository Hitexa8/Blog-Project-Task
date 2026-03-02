const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// GET comments for a post
router.get('/post/:postId', commentController.getCommentsByPost);

// POST create new comment
router.post('/post/:postId', commentController.createComment);

// GET rating stats for a post
router.get('/stats/:postId', commentController.getRatingStats);

module.exports = router;
