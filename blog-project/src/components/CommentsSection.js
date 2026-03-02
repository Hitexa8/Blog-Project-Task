'use client';

import { useState } from 'react';
import Comments from '@/components/Comments';
import CommentForm from '@/components/CommentForm';

export default function CommentsSection({ postId }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCommentAdded = () => {
    // Increment trigger to force Comments component to refetch
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <Comments postId={postId} refreshTrigger={refreshTrigger} />

      <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
    </>
  );
}
