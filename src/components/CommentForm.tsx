import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAddComment } from '../hooks/useComments';

interface CommentFormProps {
  taskId: number;
  projectId?: number;
}

const CommentForm = ({ taskId, projectId }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const addComment = useAddComment(taskId, projectId);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addComment.mutate(
      { content: content.trim() },
      { onSuccess: () => setContent('') }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        maxLength={1000}
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
      <button
        type="submit"
        disabled={!content.trim() || addComment.isPending}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
      >
        {addComment.isPending ? '...' : 'Send'}
      </button>
    </form>
  );
};

export default CommentForm;