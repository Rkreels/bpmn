
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
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
      prev.map(notif => {
        if (notif.id === id) {
          toast({
            title: "Notification marked as read",
            description: notif.title,
          });
          return { ...notif, read: true };
        }
        return notif;
      })
    );
  }, [toast]);

  const clearAll = useCallback(() => {
    setNotifications([]);
    toast({
      title: "Notifications cleared",
      description: "All notifications have been removed",
    });
  }, [toast]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'read'>) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    toast({
      title: "New notification",
      description: notification.title,
    });
  }, [toast]);

  return { 
    notifications, 
    markAsRead, 
    clearAll,
    addNotification
  };
};
