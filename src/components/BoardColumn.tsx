import { useState } from 'react';
import type { Column, Task } from '../types';
import TaskCard from './TaskCard';
import { useDeleteColumn } from '../hooks/useColumns';

interface BoardColumnProps {
  column: Column;
  projectId: number;
  onTaskClick: (task: Task) => void;
  onAddTask: (columnId: number) => void;
  canManage: boolean;
}

const BoardColumn = ({
  column,
  projectId,
  onTaskClick,
  onAddTask,
  canManage,
}: BoardColumnProps) => {
  const deleteColumn = useDeleteColumn(projectId);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = () => {
    setMenuOpen(false);
    if (window.confirm(`Delete column "${column.name}" and all its tasks?`)) {
      deleteColumn.mutate(column.id);
    }
  };

  return (
    <div className="bg-gray-100 rounded-2xl p-3 w-72 sm:w-80 flex-shrink-0 flex flex-col max-h-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="font-bold text-gray-700 text-sm truncate">
            {column.name}
          </h3>
          <span className="text-xs text-gray-500 bg-white px-1.5 rounded-full">
            {column.tasks.length}
          </span>
        </div>

        {canManage && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-white rounded-full"
            >
              ⋯
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                ></div>
                <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <button
                    onClick={handleDelete}
                    disabled={deleteColumn.isPending}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    {deleteColumn.isPending ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {column.tasks.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">
            No tasks yet.
          </p>
        )}

        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
          />
        ))}
      </div>

      <button
        onClick={() => onAddTask(column.id)}
        className="mt-3 w-full py-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-white rounded-lg font-medium transition"
      >
        + Add Task
      </button>
    </div>
  );
};

export default BoardColumn;