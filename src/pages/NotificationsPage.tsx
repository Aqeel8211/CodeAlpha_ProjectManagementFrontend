import {
  useNotifications,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from '../hooks/useNotifications';
import { formatDate } from '../utils/formatDate';

const NotificationsPage = () => {
  const { data: notifications, isLoading } = useNotifications();
  const markRead = useMarkNotificationAsRead();
  const markAllRead = useMarkAllNotificationsAsRead();

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Notifications
          </h1>
          <p className="text-sm text-gray-500">
            {unreadCount > 0
              ? `${unreadCount} unread`
              : 'All caught up'}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending}
            className="px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 font-medium disabled:opacity-50"
          >
            {markAllRead.isPending ? 'Marking...' : 'Mark all read'}
          </button>
        )}
      </div>

      {isLoading && (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse"
            >
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && notifications && notifications.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <div className="text-5xl mb-3">🔔</div>
          <p className="text-gray-500 text-sm">No notifications yet.</p>
        </div>
      )}

      {!isLoading && notifications && notifications.length > 0 && (
        <div className="space-y-2">
          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => !n.isRead && markRead.mutate(n.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                n.isRead
                  ? 'bg-white border-gray-200'
                  : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
              }`}
            >
              <div className="flex items-start gap-3">
                {!n.isRead && (
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 break-words">{n.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(n.createdAt)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;