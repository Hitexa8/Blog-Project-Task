# Blog Project - Full Stack Application

A full-stack blog application with Next.js frontend and Node.js/Express backend, MongoDB database, and article editing capabilities.

## 🚀 Live URLs

- **Frontend (Vercel)**: https://hitexa-blog-project-task.vercel.app
- **Backend (Render)**: https://blog-backend-iiw3.onrender.com
- **GitHub Repository**: https://github.com/Hitexa8/Blog-Project-Task

## 📋 Features

- **Frontend**: Next.js 16 with React 19
- **Backend**: Express.js with MongoDB
- **Article Management**: Create, read, edit articles with markdown support
- **Comments**: Add and view comments on articles
- **Responsive Design**: Mobile-first responsive layout
- **CORS Enabled**: Secure API access from frontend
- **Environment Configuration**: Easy deployment setup

## 🛠️ Tech Stack

### Frontend
- Next.js 16.1.6
- React 19.2.3
- CSS Modules
- Dynamic imports for performance

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests
- dotenv for environment variables

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. **Navigate to backend directory**:
```bash
cd blog-backend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create `.env.local` file** (for local development):
```env
MONGODB_URI=mongodb://localhost:27017/blog-db
PORT=5000
FRONTEND_URL=http://localhost:3000
```

4. **For production** (Render), set these environment variables:
```env
MONGODB_URI=mongodb+srv://[username]:[password]@cluster.mongodb.net/blog_db
PORT=11000
FRONTEND_URL=https://hitexa-blog-project-task.vercel.app
```

5. **Start the backend**:
```bash
npm run dev
```

Backend will run on `http://localhost:5000` (local) or port `11000` (Render)

### Frontend Setup

1. **Navigate to frontend directory**:
```bash
cd blog-project
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create `.env` file** (for local development):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. **For production** (Vercel), set environment variable in Vercel dashboard:
   - **Variable Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://blog-backend-iiw3.onrender.com`

5. **Start the frontend development server**:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

6. **Build for production**:
```bash
npm run build
npm start
```

## 🚀 Running Both Locally

### Option 1: Two Terminal Windows

**Terminal 1 - Backend**:
```bash
cd blog-backend
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd blog-project
npm run dev
```

Then visit: http://localhost:3000

### Option 2: From Root Directory

**Install all dependencies**:
```bash
npm run install-all
```

**Start backend** (Terminal 1):
```bash
npm run dev:backend
```

**Start frontend** (Terminal 2):
```bash
npm run dev:frontend
```

## 📝 API Endpoints

### Posts
- `GET /api/posts` - Get all articles
- `GET /api/posts/:slug` - Get single article
- `PUT /api/posts/:slug` - Update article

### Comments
- `GET /api/comments/post/:postId` - Get comments for a post
- `POST /api/comments/post/:postId` - Add new comment

## 🌍 Environment Variables

### Backend (`.env` or Render environment)
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000 (local) or 11000 (production)
FRONTEND_URL=http://localhost:3000 (local) or https://your-vercel-url.vercel.app (production)
```

### Frontend (`.env.local` or Vercel environment)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000 (local) or https://blog-backend-iiw3.onrender.com (production)
```

## 📂 Project Structure

```
Blog-Project-Task/
├── blog-backend/              # Node.js/Express backend
│   ├── src/
│   │   ├── server.js         # Main server file
│   │   ├── controllers/       # API controllers
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   └── db/               # Database connection
│   ├── .env                  # Production environment variables
│   ├── .env.local            # Local development variables
│   ├── .env.example          # Template for environment variables
│   ├── .gitignore            # Git ignore rules
│   └── package.json
│
├── blog-project/             # Next.js frontend
│   ├── src/
│   │   ├── app/              # Next.js app directory
│   │   ├── components/       # React components
│   │   ├── config/           # Configuration files
│   │   └── data/             # Static data
│   ├── public/               # Static assets
│   ├── .env                  # Production environment variables
│   ├── .env.local            # Local development variables
│   ├── .env.example          # Template for environment variables
│   ├── vercel.json           # Vercel deployment config
│   └── package.json
│
└── package.json              # Root package.json (optional)
```

## 🔧 Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check if port 5000 is available
- Verify `MONGODB_URI` in `.env.local`

### Frontend can't connect to backend
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend is running
- Verify CORS is enabled on backend
- Check browser console for error messages

### Too many redirects on Vercel
- Clear browser cookies
- Ensure `vercel.json` doesn't have problematic rewrites
- Check that environment variables are set correctly

### Articles not loading
- Verify backend is running and accessible
- Check network tab in browser DevTools
- Ensure `NEXT_PUBLIC_API_URL` points to correct backend

## 📦 Deployment

### Backend (Render)
1. Push code to GitHub
2. Connect Render to GitHub repository
3. Set environment variables in Render dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: 11000
   - `FRONTEND_URL`: Your Vercel frontend URL
4. Deploy from the `blog-backend` directory

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set root directory to `blog-project`
3. Set environment variable:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL
4. Deploy

## Security Notes

- `.env` files are in `.gitignore` - never commit sensitive data
- Use environment variables for all sensitive information
- CORS is configured to accept requests from your frontend URL
- MongoDB credentials are stored in environment variables only

## earn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Vercel Deployment](https://vercel.com/docs)
- [Render Deployment](https://render.com/docs)

## 👤 Author

Hitexa8

## 📄 License

ISC
