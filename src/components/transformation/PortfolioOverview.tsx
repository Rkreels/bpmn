
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  Target, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Plus,
  Filter,
  Eye,
  Edit
} from "lucide-react";

export const PortfolioOverview: React.FC = () => {
  const { speakText } = useVoice();

  const initiatives = [
    {
      id: "init-001",
      name: "Customer Experience Transformation",
      status: "in-progress",
      priority: "high",
      budget: "$450K",
      spent: "$287K",
      progress: 68,
      owner: "Sarah Chen",
      dueDate: "2024-06-30",
      category: "customer-experience"
    },
    {
      id: "init-002", 
      name: "Process Automation Suite",
      status: "planning",
      priority: "medium",
      budget: "$320K",
      spent: "$45K",
      progress: 15,
      owner: "Mike Rodriguez",
      dueDate: "2024-09-15",
      category: "automation"
    },
    {
      id: "init-003",
      name: "Data Analytics Platform",
      status: "in-progress", 
      priority: "high",
      budget: "$280K",
      spent: "$198K",
      progress: 75,
      owner: "Lisa Wang",
      dueDate: "2024-05-31",
      category: "analytics"
    }
  ];

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Portfolio Overview. Manage your transformation initiative portfolio. Track progress, budgets, and timelines across all active transformation programs.")}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transformation Portfolio</CardTitle>
              <CardDescription>Active transformation initiatives and their progress</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Initiative
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {initiatives.map((initiative) => (
              <div key={initiative.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{initiative.name}</h3>
                      <Badge variant={
                        initiative.status === "in-progress" ? "default" :
                        initiative.status === "planning" ? "secondary" : "outline"
                      }>
                        {initiative.status.replace("-", " ")}
                      </Badge>
                      <Badge variant={
                        initiative.priority === "high" ? "destructive" :
                        initiative.priority === "medium" ? "secondary" : "outline"
                      }>
                        {initiative.priority} priority
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Budget</div>
                        <div className="font-semibold">{initiative.budget}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Spent</div>
                        <div className="font-semibold">{initiative.spent}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Owner</div>
                        <div className="font-semibold">{initiative.owner}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Due Date</div>
                        <div className="font-semibold">{new Date(initiative.dueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{initiative.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${initiative.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
