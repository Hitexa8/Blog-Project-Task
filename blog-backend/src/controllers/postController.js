const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Get all posts (for frontend static generation)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ published: true })
      .select('slug title category date excerpt heroImage author views')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: posts,
      count: posts.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single post by slug with comments
exports.getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug, published: true });

    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    // Get comments for this post
    const comments = await Comment.find({ postId: post._id, approved: true })
      .sort({ createdAt: -1 });

    // Calculate average rating
    const ratingStats = await Comment.aggregate([
      { $match: { postId: post._id, rating: { $gt: 0 } } },
      { $group: { _id: null, averageRating: { $avg: '$rating' }, totalRatings: { $sum: 1 } } },
    ]);

    const rating = ratingStats[0] || { averageRating: 0, totalRatings: 0 };

    // Increment view count
    post.views = (post.views || 0) + 1;
    await post.save();

    res.json({
      success: true,
      data: {
        ...post.toObject(),
        comments,
        rating: rating.averageRating || 0,
        totalRatings: rating.totalRatings || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, excerpt, content } = req.body;

    const post = await Post.findOne({ slug });

    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    // Update fields
    if (title) post.title = title;
    if (excerpt) post.excerpt = excerpt;
    if (content) post.content = content;

    await post.save();

    res.json({
      success: true,
      data: post,
      message: 'Post updated successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


