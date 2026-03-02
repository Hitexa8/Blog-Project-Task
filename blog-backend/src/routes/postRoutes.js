const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET all posts (for static generation)
router.get('/', postController.getAllPosts);

// GET post by slug with comments
router.get('/:slug', postController.getPostBySlug);

// PUT update post by slug
router.put('/:slug', postController.updatePost);

module.exports = router;
