// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  POSTS: `${API_BASE_URL}/api/posts`,
  POST_DETAIL: (slug) => `${API_BASE_URL}/api/posts/${slug}`,
  COMMENTS: (postId) => `${API_BASE_URL}/api/comments/post/${postId}`,
};
