
import { ChevronRight, MessageSquare, GitMerge, AlertCircle } from "lucide-react";
import { Notification } from "@/hooks/useNotifications";

interface NotificationListProps {
  notifications: Notification[];
  onClickNotification: (id: string) => void;
  onClearAll: () => void;
}

interface NotificationItemProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  onClick: () => void;
}

function NotificationItem({ icon, title, time, onClick }: NotificationItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-muted/50 cursor-pointer" onClick={onClick}>
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    </div>
  );
}

export function NotificationList({ notifications, onClickNotification, onClearAll }: NotificationListProps) {
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-enterprise-blue-600" />;
      case 'update':
        return <GitMerge className="h-4 w-4 text-enterprise-blue-600" />;
      case 'alert':
      default:
        return <AlertCircle className="h-4 w-4 text-enterprise-blue-600" />;
    }
  };

  return (
    <>
      <div className="text-base flex items-center justify-between">
        <span>Recent Notifications</span>
        <button 
          onClick={onClearAll}
          className="text-xs p-0 h-auto text-primary hover:underline"
        >
          Clear All
        </button>
      </div>
      <div className="divide-y">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem 
              key={notification.id}
              icon={getNotificationIcon(notification.type)}
              title={notification.title}
              time={notification.time}
              onClick={() => onClickNotification(notification.id)}
            />
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No new notifications
          </div>
        )}
      </div>
    </>
  );
}
