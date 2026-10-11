import type { Task } from '../types';
import PriorityBadge from './PriorityBadge';
import UserAvatar from './UserAvatar';
import { formatDueDate } from '../utils/formatDate';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-gray-200 rounded-xl p-3 hover:shadow-md hover:border-blue-200 transition"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-semibold text-gray-800 break-words flex-1">
          {task.title}
        </p>
        <PriorityBadge priority={task.priority} />
      </div>

      {task.description && (
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span>💬 {task.commentCount}</span>
          {task.dueDate && (
            <span className="text-orange-600 font-medium">
              📅 {formatDueDate(task.dueDate)}
            </span>
          )}
        </div>

        {task.assignments.length > 0 && (
          <div className="flex -space-x-2">
            {task.assignments.slice(0, 3).map((a) => (
              <div key={a.userId} className="ring-2 ring-white rounded-full">
                <UserAvatar
                  username={a.username}
                  profilePictureUrl={a.profilePictureUrl}
                  size="sm"
                />
              </div>
            ))}
            {task.assignments.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center text-xs font-semibold text-gray-600">
                +{task.assignments.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
    </button>
  );
};

export default TaskCard;