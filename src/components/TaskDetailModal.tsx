import { useState } from 'react';
import type { Task, ProjectMember } from '../types';
import { useComments } from '../hooks/useComments';
import {
  useDeleteTask,
  useUpdateTask,
  useAssignTask,
  useUnassignTask,
} from '../hooks/useTasks';
import { formatFullDate } from '../utils/formatDate';
import PriorityBadge from './PriorityBadge';
import UserAvatar from './UserAvatar';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface TaskDetailModalProps {
  task: Task;
  projectId: number;
  members: ProjectMember[];
  ownerId: number;
  ownerUsername: string;
  onClose: () => void;
}

const TaskDetailModal = ({
  task,
  projectId,
  members,
  ownerId,
  ownerUsername,
  onClose,
}: TaskDetailModalProps) => {
  const { data: comments } = useComments(task.id);

  const updateTask = useUpdateTask(projectId);
  const deleteTask = useDeleteTask(projectId);
  const assignTask = useAssignTask(projectId);
  const unassignTask = useUnassignTask(projectId);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.split('T')[0] : ''
  );
  const [showAssign, setShowAssign] = useState(false);

  // Combine owner + members into a single array of assignable users
  const allUsers = [
    {
      userId: ownerId,
      username: ownerUsername,
      profilePictureUrl: null,
      role: 'Admin',
      joinedAt: '',
    },
    ...members.filter((m) => m.userId !== ownerId),
  ];

  const assignedIds = task.assignments.map((a) => a.userId);

  const handleSave = () => {
    updateTask.mutate(
      {
        id: task.id,
        data: {
          title: title.trim(),
          description: description.trim() || null,
          priority,
          dueDate: dueDate || null,
        },
      },
      { onSuccess: () => setEditing(false) }
    );
  };

  const handleDelete = () => {
    if (window.confirm('Delete this task?')) {
      deleteTask.mutate(task.id, { onSuccess: onClose });
    }
  };

  const handleAssign = (userId: number) => {
    assignTask.mutate({ taskId: task.id, userId });
    setShowAssign(false);
  };

  const handleUnassign = (userId: number) => {
    unassignTask.mutate({ taskId: task.id, userId });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start sm:items-center justify-center z-50 px-3 sm:px-4 py-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-4 sm:my-6">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 min-w-0">
            <PriorityBadge priority={task.priority} />
            <span className="text-xs text-gray-500 truncate">
              Created by {task.createdByUsername} · {formatFullDate(task.createdAt)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-full flex-shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={200}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  maxLength={2000}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!title.trim() || updateTask.isPending}
                  className="px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {updateTask.isPending ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-3 break-words">
                {task.title}
              </h2>

              {task.description && (
                <p className="text-sm text-gray-700 whitespace-pre-wrap mb-4 break-words">
                  {task.description}
                </p>
              )}

              {task.dueDate && (
                <div className="mb-4 text-sm">
                  <span className="text-gray-500">Due: </span>
                  <span className="text-gray-800 font-medium">
                    {formatFullDate(task.dueDate)}
                  </span>
                </div>
              )}

              {/* Assignments */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Assignees
                  </h3>
                  <button
                    onClick={() => setShowAssign(!showAssign)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Assign
                  </button>
                </div>

                {showAssign && (
                  <div className="mb-2 p-2 bg-gray-50 rounded-lg max-h-40 overflow-y-auto">
                    {allUsers.map((u) => {
                      const isAssigned = assignedIds.includes(u.userId);
                      return (
                        <button
                          key={u.userId}
                          onClick={() =>
                            isAssigned
                              ? handleUnassign(u.userId)
                              : handleAssign(u.userId)
                          }
                          className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-white rounded-md text-left"
                        >
                          <UserAvatar username={u.username} size="sm" />
                          <span className="text-sm text-gray-700 flex-1 truncate">
                            {u.username}
                          </span>
                          {isAssigned && (
                            <span className="text-xs text-green-600 font-semibold">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {task.assignments.length === 0 && (
                    <p className="text-xs text-gray-400">
                      Nobody assigned yet.
                    </p>
                  )}
                  {task.assignments.map((a) => (
                    <div
                      key={a.userId}
                      className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-full"
                    >
                      <UserAvatar
                        username={a.username}
                        profilePictureUrl={a.profilePictureUrl}
                        size="sm"
                      />
                      <span className="text-xs text-gray-700">{a.username}</span>
                      <button
                        onClick={() => handleUnassign(a.userId)}
                        className="text-gray-400 hover:text-red-500 ml-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mb-6 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setEditing(true)}
                  className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteTask.isPending}
                  className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50"
                >
                  {deleteTask.isPending ? 'Deleting...' : '🗑️ Delete'}
                </button>
              </div>

              {/* Comments */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Comments ({comments?.length || 0})
                </h3>
                <CommentList taskId={task.id} comments={comments || []} />
                <CommentForm taskId={task.id} projectId={projectId} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;