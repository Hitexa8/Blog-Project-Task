'use client';

import { useState } from 'react';
import styles from '@/app/articles/article.module.css';

export default function EditSection() {
  const [markdown, setMarkdown] = useState('');

  const handleSave = () => {
    console.log('Saving markdown:', markdown);
    alert('Changes saved!');
  };

  return (
    <div className={styles.editModal}>
      <div className={styles.editContainer}>
        <h3>Edit Article</h3>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Enter markdown here..."
          className={styles.markdownEditor}
          rows="15"
        />
        <div className={styles.editActions}>
          <button onClick={handleSave} className={styles.saveBtn}>
            💾 Save
          </button>
          <button className={styles.cancelBtn}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
