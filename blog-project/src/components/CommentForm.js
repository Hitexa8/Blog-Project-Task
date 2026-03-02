'use client';

import { useState } from 'react';
import styles from '@/app/articles/article.module.css';
import { API_ENDPOINTS } from '@/config/api';

export default function CommentForm({ postId, onCommentAdded }) {
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    content: '',
    rating: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const setRating = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(API_ENDPOINTS.COMMENTS(postId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          avatar: '/avatars/default.jpg',
          date: new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const { data } = await response.json();
      setMessage('✅ Comment submitted successfully!');
      setFormData({ author: '', email: '', content: '', rating: 0 });

      // Notify parent to refresh comments
      if (onCommentAdded) {
        onCommentAdded();
      }

      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error submitting comment:', error);
      setMessage('❌ Failed to submit comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.addComment}>
      <h3>Add A Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <div className={styles.formLeftColumn}>
            <div className={styles.formGroup}>
              <label>Name <span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Your name"
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email <span style={{ color: 'red' }}>*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={styles.formInput}
                required
              />
            </div>
          </div>
          <div className={styles.formRightColumn}>
            <div className={styles.formGroup}>
              <label>Comment <span style={{ color: 'red' }}>*</span></label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Share your thoughts..."
                className={styles.formTextarea}
                required
              />
            </div>
          </div>
        </div>
       <div className={styles.formActions}>
  <div className={styles.ratingSection}>
    
    <span>Rate The Usefulness Of The Article</span>

    <div className={styles.ratingButtons}>
      {[
        { emoji: '😞', rating: 1 },
        { emoji: '😕', rating: 2 },
        { emoji: '😊', rating: 3 },
        { emoji: '😄', rating: 4 },
        { emoji: '🤩', rating: 5 },
      ].map(({ emoji, rating }) => (
        <button
          key={rating}
          type="button"
          className={`${styles.emojiBtn} ${
            formData.rating === rating ? styles.active : ''
          }`}
          onClick={() => setRating(rating)}
        >
          {emoji}
        </button>
      ))}
    </div>
  </div>

  <button
    type="submit"
    className={styles.sendBtn}
    disabled={loading || !formData.author || !formData.email || !formData.content}
  >
    {loading ? '⏳ Sending...' : '🔗 Send'}
  </button>
</div>

        {message && (
          <div
            style={{
              marginTop: '15px',
              padding: '10px',
              borderRadius: '4px',
              backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
              color: message.includes('✅') ? '#155724' : '#721c24',
              border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
            }}
          >
            {message}
          </div>
        )}
      </form>
    </section>
  );
}
