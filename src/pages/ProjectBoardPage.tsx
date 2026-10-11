import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProject } from '../hooks/useProject';
import { useAuth } from '../hooks/useAuth';
import BoardColumn from '../components/BoardColumn';
import CreateTaskModal from '../components/CreateTaskModal';
import AddMemberModal from '../components/AddMemberModal';
import MemberList from '../components/MemberList';
import TaskDetailModal from '../components/TaskDetailModal';
import type { Task } from '../types';

const ProjectBoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const { user } = useAuth();

  const { data: project, isLoading, isError } = useProject(projectId);

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showMembers, setShowMembers] = useState(false);

  const canManage = project?.myRole === 'Admin';

  const handleAddTask = (columnId: number) => {
    setSelectedColumnId(columnId);
    setTaskModalOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <Link
        to="/dashboard"
        className="text-sm text-blue-600 hover:underline mb-3 inline-block"
      >
        ← Back to Dashboard
      </Link>

      {isLoading && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl text-center">
          Failed to load project.
        </div>
      )}

      {project && (
        <>
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 mb-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
                    {project.name}
                  </h1>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      canManage
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {project.myRole}
                  </span>
                </div>
                {project.description && (
                  <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                )}
                <p className="text-xs text-gray-500">
                  Owner: {project.ownerUsername} · {project.members.length + 1} member
                  {project.members.length + 1 !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowMembers(!showMembers)}
                  className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  👥 Members
                </button>
                {canManage && (
                  <button
                    onClick={() => setMemberModalOpen(true)}
                    className="px-3 py-1.5 text-sm bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 font-medium"
                  >
                    + Add Member
                  </button>
                )}
              </div>
            </div>

            {showMembers && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Project Members
                </h3>
                <MemberList
                  projectId={projectId}
                  members={project.members}
                  ownerId={project.ownerId}
                  ownerUsername={project.ownerUsername}
                  canManage={canManage || user?.userId === project.ownerId}
                />
              </div>
            )}
          </div>

          {/* Board */}
          <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-sm overflow-x-auto">
            <div className="flex gap-3 sm:gap-4 min-h-[400px] pb-2">
              {project.columns
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((column) => (
                  <BoardColumn
                    key={column.id}
                    column={column}
                    projectId={projectId}
                    onTaskClick={handleTaskClick}
                    onAddTask={handleAddTask}
                    canManage={canManage}
                  />
                ))}
            </div>
          </div>
        </>
      )}

      <CreateTaskModal
        isOpen={taskModalOpen}
        projectId={projectId}
        columnId={selectedColumnId}
        onClose={() => {
          setTaskModalOpen(false);
          setSelectedColumnId(null);
        }}
      />

      <AddMemberModal
        isOpen={memberModalOpen}
        projectId={projectId}
        onClose={() => setMemberModalOpen(false)}
      />

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          projectId={projectId}
          members={project?.members || []}
          ownerId={project?.ownerId || 0}
          ownerUsername={project?.ownerUsername || ''}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default ProjectBoardPage;