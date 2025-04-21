
import { useState, useCallback } from 'react';

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'message' | 'update' | 'alert';
  icon?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New comments on "Customer Onboarding"',
      description: 'Lisa added: "We should clarify the approval step"',
      time: '10 mins ago',
      read: false,
      type: 'message'
    },
    {
      id: '2',
      title: 'Process "Order to Cash" updated',
      description: 'Major version update to v2.0',
      time: '2 hours ago',
      read: false,
      type: 'update'
    },
    {
      id: '3',
      title: 'Bottleneck detected in "Invoice Approval"',
      description: 'Processing time increased by 25%',
      time: 'Yesterday',
      read: false,
      type: 'alert'
    }
  ]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return { notifications, markAsRead, clearAll };
};
