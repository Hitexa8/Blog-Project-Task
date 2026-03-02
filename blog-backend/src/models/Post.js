const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      default: '',
    },
    heroImage: {
      type: String,
      default: '',
    },
    content: [
      {
        type: {
          type: String,
          enum: ['paragraph', 'section'],
        },
        text: String,
        title: String,
        content: String,
      },
    ],
    author: {
      name: String,
      bio: String,
      image: String,
      rating: Number,
    },
    views: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
