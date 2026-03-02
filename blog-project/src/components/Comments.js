'use client';

import { useState, useEffect } from 'react';
import styles from '@/app/articles/article.module.css';
import { API_ENDPOINTS } from '@/config/api';

export default function Comments({ postId, refreshTrigger }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.COMMENTS(postId));
        if (!res.ok) throw new Error('Failed to fetch comments');
        const { data } = await res.json();
        setComments(data || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId, refreshTrigger]);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  return (
    <section className={styles.commentsSection}>
      <h3># Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p style={{ color: '#999' }}>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className={styles.comment}>
            <img
              src={comment.avatar}
              alt={comment.author}
              className={styles.commentAvatar}
            />
            <div className={styles.commentContent}>
              <div className={styles.commentHeader}>
                <h4>{comment.author}</h4>
                <div className={styles.rating}>
                  {'⭐'.repeat(comment.rating || 0)}
                </div>
                <span className={styles.commentDate}>{comment.date}</span>
              </div>
              <p className={styles.commentText}>{comment.content}</p>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
