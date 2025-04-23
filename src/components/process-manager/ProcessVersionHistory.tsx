
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowDown, Calendar, Clock, Download, History, User, 
  Copy, GitCompare, RotateCcw
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
  const { toast } = useToast();
  const [compareDialog, setCompareDialog] = useState<boolean>(false);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState<boolean>(false);
  const [versionToRestore, setVersionToRestore] = useState<string | null>(null);

  const handleExportHistory = () => {
    toast({
      title: "Exporting Version History",
      description: "The version history has been exported as CSV."
    });
  };

  const handleRestoreVersion = (version: string) => {
    setVersionToRestore(version);
    setRestoreDialogOpen(true);
  };

  const confirmRestore = () => {
    toast({
      title: "Version Restored",
      description: `Version ${versionToRestore} has been restored successfully.`
    });
    setRestoreDialogOpen(false);
  };

  const handleCompare = (id: string) => {
    if (selectedVersions.includes(id)) {
      setSelectedVersions(selectedVersions.filter(v => v !== id));
    } else {
      if (selectedVersions.length < 2) {
        setSelectedVersions([...selectedVersions, id]);
      } else {
        setSelectedVersions([selectedVersions[1], id]);
      }
    }
  };

  const handleStartComparison = () => {
    if (selectedVersions.length === 2) {
      setCompareDialog(true);
    } else {
      toast({
        title: "Select Two Versions",
        description: "Please select exactly two versions to compare.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Version History</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={handleExportHistory}>
            <Download className="h-4 w-4" />
            Export History
          </Button>
          {selectedVersions.length > 0 && (
            <Button variant="outline" size="sm" className="gap-1" onClick={handleStartComparison}>
              <GitCompare className="h-4 w-4" />
              Compare Selected
            </Button>
          )}
          <Button variant="outline" size="sm" className="gap-1" disabled={!versionToRestore} onClick={() => setRestoreDialogOpen(true)}>
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
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`select-${version.id}`}
                    checked={selectedVersions.includes(version.id)}
                    onChange={() => handleCompare(version.id)}
                    className="mr-2 rounded"
                  />
                  <History className="h-4 w-4 text-muted-foreground" />
                </div>
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
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCompare(version.id)}
              >
                <GitCompare className="h-4 w-4 mr-1" />
                Compare
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleRestoreVersion(version.version)}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Restore
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
              >
                <Copy className="h-4 w-4 mr-1" />
                Duplicate
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Version Comparison Dialog */}
      <Dialog open={compareDialog} onOpenChange={setCompareDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Compare Versions</DialogTitle>
            <DialogDescription>
              Comparing {selectedVersions.length === 2 && 
                `version ${versionHistory.find(v => v.id === selectedVersions[0])?.version} and 
                 version ${versionHistory.find(v => v.id === selectedVersions[1])?.version}`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="border rounded-md p-4">
              <h4 className="font-medium text-sm mb-2">
                Version {selectedVersions.length > 0 && versionHistory.find(v => v.id === selectedVersions[0])?.version}
              </h4>
              <div className="bg-muted/50 p-4 rounded-md h-[300px] flex items-center justify-center">
                [Version Diff View]
              </div>
            </div>
            <div className="border rounded-md p-4">
              <h4 className="font-medium text-sm mb-2">
                Version {selectedVersions.length > 1 && versionHistory.find(v => v.id === selectedVersions[1])?.version}
              </h4>
              <div className="bg-muted/50 p-4 rounded-md h-[300px] flex items-center justify-center">
                [Version Diff View]
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompareDialog(false)}>Close</Button>
            <Button>Generate Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Restore Version Dialog */}
      <Dialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restore Version</DialogTitle>
            <DialogDescription>
              Are you sure you want to restore to version {versionToRestore}? This will create a new version based on the selected version.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRestoreDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmRestore}>Confirm Restore</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
