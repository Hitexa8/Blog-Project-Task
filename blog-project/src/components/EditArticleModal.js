'use client';

import { useState } from 'react';
import styles from '@/app/articles/article.module.css';
import { API_ENDPOINTS } from '@/config/api';

export default function EditArticleModal({ article, isOpen, onClose, onSave }) {
  const [editData, setEditData] = useState({
    title: article?.title || '',
    excerpt: article?.excerpt || '',
    content: article?.content || [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (idx, field, value) => {
    const newContent = [...editData.content];
    newContent[idx] = { ...newContent[idx], [field]: value };
    setEditData(prev => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(API_ENDPOINTS.POST_DETAIL(article.slug), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        throw new Error('Failed to update article');
      }

      setMessage('Article updated successfully!');
      setTimeout(() => {
        onSave(editData);
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error updating article:', error);
      setMessage('Failed to update article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.editModal} onClick={onClose}>
      <div className={styles.editContainer} onClick={(e) => e.stopPropagation()}>
        <h3>Edit Article</h3>
        
        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Excerpt</label>
          <textarea
            name="excerpt"
            value={editData.excerpt}
            onChange={handleChange}
            className={styles.formTextarea}
            rows="3"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Content Sections</label>
          {editData.content?.map((section, idx) => (
            <div key={idx} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <input
                type="text"
                placeholder="Type (paragraph/section)"
                value={section.type}
                onChange={(e) => handleContentChange(idx, 'type', e.target.value)}
                className={styles.formInput}
                style={{ marginBottom: '10px' }}
                disabled
              />
              {section.type === 'section' && (
                <input
                  type="text"
                  placeholder="Title"
                  value={section.title || ''}
                  onChange={(e) => handleContentChange(idx, 'title', e.target.value)}
                  className={styles.formInput}
                  style={{ marginBottom: '10px' }}
                />
              )}
              <textarea
                placeholder="Content"
                value={section.type === 'section' ? section.content : section.text}
                onChange={(e) => handleContentChange(idx, section.type === 'section' ? 'content' : 'text', e.target.value)}
                className={styles.formTextarea}
                rows="4"
              />
            </div>
          ))}
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
              marginBottom: '15px',
            }}
          >
            {message}
          </div>
        )}

        <div className={styles.editActions}>
          <button
            onClick={onClose}
            className={styles.cancelBtn}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={styles.saveBtn}
            disabled={loading}
          >
            {loading ? '⏳ Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
