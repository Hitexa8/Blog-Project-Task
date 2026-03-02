const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Get comments for a post
exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId, approved: true })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: comments,
      count: comments.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new comment
exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const commentData = req.body;

    // Verify post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    const comment = new Comment({
      postId,
      ...commentData,
    });

    await comment.save();

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



// Get rating stats for a post
exports.getRatingStats = async (req, res) => {
  try {
    const { postId } = req.params;
    const stats = await Comment.aggregate([
      { $match: { postId: require('mongoose').Types.ObjectId(postId), rating: { $gt: 0 } } },
      { $group: { _id: null, averageRating: { $avg: '$rating' }, totalRatings: { $sum: 1 } } },
    ]);

    const result = stats[0] || { averageRating: 0, totalRatings: 0 };

    res.json({
      success: true,
      data: {
        averageRating: result.averageRating || 0,
        totalRatings: result.totalRatings || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
