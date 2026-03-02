'use client';

import { useState } from 'react';
import { API_ENDPOINTS } from '@/config/api';

export default function EditArticleWrapper({ article }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullContent, setFullContent] = useState(
    article.content
      ?.map((section) => {
        if (section.type === 'section') {
          return `## ${section.title}\n${section.content}`;
        }
        return section.text;
      })
      .join('\n\n') || ''
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setMessage('');

    try {
      // Parse markdown content properly
      const parsedContent = [];
      const lines = fullContent.split('\n');
      let i = 0;

      while (i < lines.length) {
        const line = lines[i];

        // Skip empty lines at the beginning
        if (!line.trim()) {
          i++;
          continue;
        }

        // Check if this is a section header (## Title)
        if (line.startsWith('##')) {
          const title = line.replace(/^##\s*/, '').trim();
          const contentLines = [];
          i++;

          // Collect all content until the next section or end
          while (i < lines.length) {
            if (lines[i].startsWith('##')) {
              break; // Found next section
            }
            contentLines.push(lines[i]);
            i++;
          }

          // Process the collected content
          const rawContent = contentLines.join('\n');
          const content = rawContent
            .split('\n\n')
            .map(p => p.trim())
            .filter(p => p)
            .join('\n\n');

          if (title && content) {
            parsedContent.push({
              type: 'section',
              title: title.trim(),
              content: content.trim(),
            });
          }
        } else if (line.trim()) {
          // Regular paragraph content
          const paragraphLines = [];

          // Collect lines until a section header or double newline
          while (i < lines.length && !lines[i].startsWith('##')) {
            const currentLine = lines[i];
            
            if (!currentLine.trim()) {
              // Empty line - might be paragraph separator
              i++;
              break;
            }
            
            paragraphLines.push(currentLine);
            i++;
          }

          // Join paragraphs properly
          const paragraphText = paragraphLines
            .join('\n')
            .split('\n\n')
            .map(p => p.trim())
            .filter(p => p)
            .join('\n\n');

          if (paragraphText) {
            parsedContent.push({
              type: 'paragraph',
              text: paragraphText.trim(),
            });
          }
        } else {
          i++;
        }
      }

      const contentToSave = parsedContent.length > 0 ? parsedContent : article.content;
      
      console.log('Saving content:', contentToSave);

      const response = await fetch(API_ENDPOINTS.POST_DETAIL(article.slug), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: article.title,
          excerpt: article.excerpt,
          content: contentToSave,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save article');
      }

      const responseData = await response.json();
      console.log('Save response:', responseData);

      setMessage('✅ Article saved successfully!');
      setTimeout(() => {
        setIsEditing(false);
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error saving article:', error);
      setMessage(`❌ ${error.message || 'Failed to save article. Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <button
        style={{
          marginTop: '15px',
          padding: '8px 16px',
        backgroundColor: 'white',
          color: '#000',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
        }}
        onClick={() => setIsEditing(true)}
      >
         Edit Article
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={() => setIsEditing(false)}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          maxWidth: '700px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          padding: '30px',
          position: 'relative',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsEditing(false)}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: '#666',
          }}
        >
          ✕
        </button>

        {/* Title */}
        <h2 style={{ marginTop: 0, marginRight: '30px', fontSize: '20px', fontWeight: '700' }}>
          Edit: {article.title}
        </h2>

        {/* Content Section */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#333',
            }}
          >
            Content (Markdown supported)
          </label>
          <textarea
            value={fullContent}
            onChange={(e) => setFullContent(e.target.value)}
            style={{
              width: '100%',
              minHeight: '400px',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: "'Courier New', monospace",
              resize: 'vertical',
            }}
            placeholder="Enter your article content here. Use ## for section headers."
          />
          <p
            style={{
              fontSize: '13px',
              color: '#999',
              marginTop: '8px',
              marginBottom: '20px',
            }}
          >
            💡 Tip: You can use basic markdown for formatting
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            style={{
              marginBottom: '20px',
              padding: '12px',
              borderRadius: '4px',
              backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
              color: message.includes('✅') ? '#155724' : '#721c24',
              border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
            }}
          >
            {message}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setIsEditing(false)}
            style={{
              padding: '10px 24px',
              backgroundColor: '#e0e0e0',
              color: '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              padding: '10px 24px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? '⏳ Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
