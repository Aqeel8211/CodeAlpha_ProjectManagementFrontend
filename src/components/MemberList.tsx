import type { ProjectMember } from '../types';
import UserAvatar from './UserAvatar';
import { useRemoveProjectMember } from '../hooks/useProjects';
import { useAuth } from '../hooks/useAuth';

interface MemberListProps {
  projectId: number;
  members: ProjectMember[];
  ownerId: number;
  ownerUsername: string;
  canManage: boolean;
}

const MemberList = ({
  projectId,
  members,
  ownerUsername,
  canManage,
}: MemberListProps) => {
  const { user } = useAuth();
  const removeMember = useRemoveProjectMember(projectId);

  const handleRemove = (memberUserId: number, username: string) => {
    if (window.confirm(`Remove ${username} from this project?`)) {
      removeMember.mutate(memberUserId);
    }
  };

  return (
    <div className="space-y-2">
      {/* Owner */}
      <div className="flex items-center justify-between px-3 py-2 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 min-w-0">
          <UserAvatar username={ownerUsername} size="sm" />
          <span className="text-sm font-medium text-gray-800 truncate">
            {ownerUsername}
          </span>
        </div>
        <span className="text-[10px] font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">
          Owner
        </span>
      </div>

      {/* Other members */}
      {members.map((m) => {
        const isSelf = user?.userId === m.userId;
        const showRemove = canManage && !isSelf;

        return (
          <div
            key={m.userId}
            className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-2 min-w-0">
              <UserAvatar
                username={m.username}
                profilePictureUrl={m.profilePictureUrl}
                size="sm"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {m.username}
                  {isSelf && <span className="text-gray-400"> (you)</span>}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  m.role === 'Admin'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {m.role}
              </span>

              {showRemove && (
                <button
                  onClick={() => handleRemove(m.userId, m.username)}
                  disabled={removeMember.isPending}
                  className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  Remove
                </button>
              )}

              {isSelf && !canManage && (
                <button
                  onClick={() => handleRemove(m.userId, m.username)}
                  disabled={removeMember.isPending}
                  className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  Leave
                </button>
              )}
            </div>
          </div>
        );
      })}

      {members.length === 0 && (
        <p className="text-xs text-gray-400 text-center py-2">
          No other members yet.
        </p>
      )}
    </div>
  );
};

export default MemberList;