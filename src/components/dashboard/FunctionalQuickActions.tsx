import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload, FileText, Users, BarChart3, Zap, Calendar, MessageSquare } from 'lucide-react';

export const FunctionalQuickActions: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    { icon: Plus, title: "New Process", description: "Create a new business process", route: "/process-manager", color: "bg-blue-500" },
    { icon: Upload, title: "Upload Data", description: "Import process data or event logs", route: "/process-mining", color: "bg-green-500" },
    { icon: FileText, title: "Generate Report", description: "Create analytics report", route: "/reports", color: "bg-purple-500" },
    { icon: Users, title: "Team Collaboration", description: "Start collaborative session", route: "/collaboration-hub", color: "bg-orange-500" },
    { icon: BarChart3, title: "Process Analytics", description: "View performance metrics", route: "/process-intelligence", color: "bg-indigo-500" },
    { icon: Calendar, title: "Journey Modeler", description: "Map customer journeys", route: "/journey-modeler", color: "bg-teal-500" },
    { icon: MessageSquare, title: "Repository", description: "Browse process assets", route: "/repository", color: "bg-pink-500" },
    { icon: Zap, title: "Transformation", description: "Digital transformation hub", route: "/transformation-cockpit", color: "bg-yellow-500" },
  ];

  return (
    <Card>
      <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button key={index} variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform" onClick={() => navigate(action.route)}>
              <div className={`p-3 rounded-full ${action.color} text-white`}><action.icon className="h-6 w-6" /></div>
              <div className="text-center"><div className="font-medium text-sm">{action.title}</div><div className="text-xs text-muted-foreground mt-1">{action.description}</div></div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
