
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  status: string;
  progress: number;
  team: string[];
  lastUpdated: string;
}

interface RecentProjectsProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export const RecentProjects: React.FC<RecentProjectsProps> = ({
  projects,
  onProjectClick
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Review": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg md:text-xl">Recent Projects</CardTitle>
            <CardDescription>Your latest process modeling projects</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/process-manager">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onProjectClick(project)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{project.name}</h3>
                    <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Team: {project.team.join(", ")}</span>
                      <span>Updated: {project.lastUpdated}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
