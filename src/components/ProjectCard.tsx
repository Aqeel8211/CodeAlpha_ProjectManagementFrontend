import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { formatDate } from '../utils/formatDate';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      to={`/project/${project.id}`}
      className="block bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-blue-200 transition"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-lg font-bold text-gray-800 truncate">{project.name}</h3>
        <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full whitespace-nowrap">
          {project.myRole}
        </span>
      </div>

      {project.description && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <span>👥 {project.memberCount}</span>
          <span>📋 {project.taskCount}</span>
        </div>
        <span>{formatDate(project.createdAt)}</span>
      </div>
    </Link>
  );
};

export default ProjectCard;