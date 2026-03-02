require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Seed database with initial data
const seedDatabase = async () => {
  try {
    // Clear existing posts and comments for fresh seed
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log('🧹 Cleared existing data');

    console.log('Seeding database with initial data...');

      const commonContent = [
        {
          type: 'paragraph',
          text: 'Discover exercises that target every muscle group, helping you build strength and endurance. Perfect for beginners and seasoned gym-goers alike.',
        },
        {
          type: 'paragraph',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
        },
        {
          type: 'paragraph',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
        },
        {
          type: 'section',
          content: 'With over a decade of experience in the fitness industry, Alex specializes in strength training and functional fitness. Certified by NASM and known for his motivational style, Alex designs workout programs that are both challenging and achievable. His passion lies in helping clients build strength and confidence through personalized training routines. Outside the gym, Alex is an avid runner and enjoys outdoor adventures.',
        },
        {
          type: 'paragraph',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        },
        {
          type: 'paragraph',
          text: 'With over a decade of experience in the fitness industry, Alex specializes in strength training and functional fitness. Certified by NASM and known for his motivational style, Alex designs workout programs that are both challenging and achievable. His passion lies in helping clients build strength and confidence through personalized training routines. Outside the gym, Alex is an avid runner and enjoys outdoor adventures.',
        },
        {
          type: 'paragraph',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        },
      ];

      const postsData = [
        {
          slug: 'ultimate-guide-full-body-workouts',
          title: 'The Ultimate Guide to Full-Body Workouts',
          category: 'FITNESS',
          date: '23 JANUARY 2025',
          heroImage: '/rope.jpg',
          content: commonContent,
          author: {
            name: 'Alex Carter',
            bio: 'With over a decade of experience in the fitness industry, Alex specializes in strength training and functional fitness.',
            image: '/authors/alex-carter.jpg',
            rating: 4.8,
          },
          published: true,
        },
        {
          slug: 'tips-better-cardio-sessions',
          title: '5 Tips for Better Cardio Sessions & Cardiovascular',
          category: 'FITNESS',
          date: '23 JAN 2022',
          heroImage: '/rope.jpg',
          content: commonContent,
          author: {
            name: 'Alex Carter',
            bio: 'With over a decade in fitness, Alex specializes in strength training. Certified by NASM, he designs challenging yet achievable workout programs. His passion is helping clients build strength and confidence through personalized routines. Outside the gym, Alex enjoys running and outdoor adventures.',
            image: '/authors/alex-carter.jpg',
            rating: 4.8,
          },
          published: true,
        },
        {
          slug: 'build-prep-basics-gym-enthusiasts',
          title: 'Build Prep Basics For Gym Enthusiasts',
          category: 'FITNESS',
          date: '23 JAN 2022',
          heroImage: '/rope.jpg',
          content: commonContent,
          author: {
            name: 'Alex Carter',
            bio: 'With over a decade in fitness, Alex specializes in strength training. Certified by NASM, he designs challenging yet achievable workout programs. His passion is helping clients build strength and confidence through personalized routines. Outside the gym, Alex enjoys running and outdoor adventures.',
            image: '/authors/alex-carter.jpg',
            rating: 4.8,
          },
          published: true,
        },
        {
          slug: 'building-core-strength-exercises-and-benefits',
          title: 'Building Core Strength: Exercises And Benefits',
          category: 'FITNESS',
          date: '20 JAN 2022',
          heroImage: '/rope.jpg',
          content: commonContent,
          author: {
            name: 'Emma Rodriguez',
            bio: 'Core training specialist with certification in functional fitness and rehabilitation.',
            image: '/authors/emma-rodriguez.jpg',
            rating: 4.9,
          },
          published: true,
        },
      ];

      const createdPosts = await Post.insertMany(postsData);

      // Add comments to first post
      const firstPost = createdPosts[0];
      const commentsData = [
        {
          postId: firstPost._id,
          author: 'Kang Haerin',
          email: 'kang@example.com',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          rating: 5,
          avatar: '/avatars/kang-haerin.jpg',
          date: '22 Jul 2022',
          approved: true,
        },
        {
          postId: firstPost._id,
          author: 'Kim Sunoo',
          email: 'kim@example.com',
          content: 'Great guide! Very helpful for beginners.',
          rating: 4,  
          avatar: '/avatars/kim-sunoo.jpg',
          date: '25 Jul 2022',
          approved: true,
        },
      ];

      await Comment.insertMany(commentsData);

      console.log(`✅ Seeded ${createdPosts.length} posts and comments`);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Seed on startup
seedDatabase();

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Backend server running on http://localhost:${PORT}`);
});

module.exports = app;
