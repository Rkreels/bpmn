
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowDown, Calendar, Clock, Download, History, User 
} from "lucide-react";

interface VersionEntry {
  id: string;
  version: string;
  author: string;
  date: string;
  time: string;
  comment: string;
  status: "current" | "published" | "archived";
}

const versionHistory: VersionEntry[] = [
  {
    id: "v1.3",
    version: "1.3",
    author: "Jane Smith",
    date: "Today",
    time: "10:45 AM",
    comment: "Updated task assignments and added new gateway logic",
    status: "current"
  },
  {
    id: "v1.2",
    version: "1.2",
    author: "Mike Johnson",
    date: "Yesterday",
    time: "3:22 PM",
    comment: "Fixed compliance issues and updated documentation",
    status: "archived"
  },
  {
    id: "v1.1",
    version: "1.1",
    author: "Sarah Lee",
    date: "2023-04-20",
    time: "11:15 AM",
    comment: "Added invoice approval subprocess and exception handling",
    status: "archived"
  },
  {
    id: "v1.0",
    version: "1.0",
    author: "John Davis",
    date: "2023-04-15",
    time: "09:30 AM",
    comment: "Initial process model creation",
    status: "published"
  }
];

export const ProcessVersionHistory: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Version History</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export History
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowDown className="h-4 w-4" />
            Restore Version
          </Button>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-4">
        {versionHistory.map((version) => (
          <div key={version.id} className="flex items-start gap-4 p-3 rounded-md border hover:bg-muted/50">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">Version {version.version}</h4>
                {version.status === "current" && (
                  <Badge variant="outline">Current</Badge>
                )}
                {version.status === "published" && (
                  <Badge variant="secondary">Published</Badge>
                )}
              </div>
              
              <p className="text-sm mt-1">{version.comment}</p>
              
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <User className="h-3.5 w-3.5 mr-1" />
                  {version.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {version.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {version.time}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">Compare</Button>
              <Button variant="ghost" size="sm">Restore</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
