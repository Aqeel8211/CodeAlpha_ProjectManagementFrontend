interface UserAvatarProps {
  username: string;
  profilePictureUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar = ({ username, profilePictureUrl, size = 'md' }: UserAvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-2xl',
  };

  const initial = username?.charAt(0).toUpperCase() || '?';

  if (profilePictureUrl) {
    return (
      <img
        src={profilePictureUrl}
        alt={username}
        className={`${sizeClasses[size]} rounded-full object-cover border border-gray-200 flex-shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold flex-shrink-0`}
    >
      {initial}
    </div>
  );
};

export default UserAvatar;