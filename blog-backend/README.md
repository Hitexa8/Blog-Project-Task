# Blog Backend API

Express.js backend for the Blog application with REST API endpoints.

## Setup

```bash
npm install
npm run dev
```

## API Endpoints

### Posts
- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:slug` - Get specific post with comments and ratings
- `POST /api/posts` - Create new blog post

### Comments
- `POST /api/posts/:slug/comments` - Add comment to post

### Ratings
- `POST /api/posts/:slug/ratings` - Add rating to post

### Health
- `GET /api/health` - Server health check

## Database Schema

### Posts Table
- id (UUID)
- slug (string)
- title (string)
- category (string)
- date (string)
- author (object)
- heroImage (string)
- excerpt (string)
- content (array)

### Comments Table
- id (UUID)
- postId (UUID)
- author (string)
- content (string)
- rating (number)
- date (string)
- avatar (string)

### Ratings Table
- id (UUID)
- postId (UUID)
- rating (number 1-5)
- date (ISO string)
