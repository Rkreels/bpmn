
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  ChevronRight,
  Download,
  FileText,
  Folder,
  GitMerge,
  Grid2X2,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share2,
  SortAsc,
  Upload,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Repository() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  return (
    <MainLayout pageTitle="Repository">
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle>Process Repository</CardTitle>
            <Breadcrumb className="mt-1">
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Main Repository</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Order Management</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  New
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-pointer">
                  <GitMerge className="h-4 w-4 mr-2" />
                  <span>BPMN Process</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Journey Map</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Decision Model</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Folder className="h-4 w-4 mr-2" />
                  <span>New Folder</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  <span>Import File</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button size="sm" variant="outline">
              <Upload className="h-4 w-4" />
            </Button>
            
            <Button size="sm" variant="outline">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search repository..."
                className="pl-8"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <SortAsc className="h-4 w-4" />
                Sort
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setViewMode("grid")}
                className={cn(
                  "h-8 w-8",
                  viewMode === "grid" ? "bg-muted" : ""
                )}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setViewMode("list")}
                className={cn(
                  "h-8 w-8",
                  viewMode === "list" ? "bg-muted" : ""
                )}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className={cn(
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
              : "flex flex-col gap-1"
          )}>
            {repositoryItems.map((item, index) => (
              <RepositoryItem
                key={index}
                item={item}
                viewMode={viewMode}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}

interface RepositoryItemType {
  name: string;
  type: "folder" | "bpmn" | "journey" | "dmn" | "document";
  owner: string;
  lastModified: string;
  version?: string;
  status?: "Draft" | "In Review" | "Approved" | "Published";
}

const repositoryItems: RepositoryItemType[] = [
  { name: "Customer Processes", type: "folder", owner: "John Doe", lastModified: "Yesterday" },
  { name: "Finance", type: "folder", owner: "System Admin", lastModified: "1 week ago" },
  { name: "HR Processes", type: "folder", owner: "Sarah Miller", lastModified: "2 days ago" },
  { name: "Order to Cash", type: "bpmn", owner: "John Doe", lastModified: "Today", version: "2.3", status: "Published" },
  { name: "Customer Onboarding", type: "journey", owner: "Lisa Johnson", lastModified: "Yesterday", version: "1.0", status: "In Review" },
  { name: "Procurement", type: "bpmn", owner: "Michael Chen", lastModified: "3 days ago", version: "3.1", status: "Draft" },
  { name: "Shipping Rules", type: "dmn", owner: "Robert Taylor", lastModified: "Last week", version: "1.2", status: "Approved" },
  { name: "Return Process", type: "bpmn", owner: "Jennifer Adams", lastModified: "2 weeks ago", version: "2.0", status: "Published" },
  { name: "Process Documentation", type: "document", owner: "Sarah Miller", lastModified: "1 month ago" },
];

interface RepositoryItemProps {
  item: RepositoryItemType;
  viewMode: "grid" | "list";
}

function RepositoryItem({ item, viewMode }: RepositoryItemProps) {
  const getIcon = () => {
    switch (item.type) {
      case "folder":
        return <Folder className="h-5 w-5 text-enterprise-blue-600" />;
      case "bpmn":
        return <GitMerge className="h-5 w-5 text-enterprise-blue-600" />;
      case "journey":
        return <Users className="h-5 w-5 text-enterprise-blue-600" />;
      case "dmn":
        return <FileText className="h-5 w-5 text-status-warning" />;
      case "document":
        return <FileText className="h-5 w-5 text-enterprise-gray-600" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  const getStatusBadge = () => {
    if (!item.status) return null;
    
    const statusColors = {
      "Draft": "bg-muted text-muted-foreground",
      "In Review": "bg-enterprise-blue-100 text-enterprise-blue-800",
      "Approved": "bg-status-success/10 text-status-success",
      "Published": "bg-status-success/10 text-status-success",
    };
    
    return (
      <Badge className={statusColors[item.status]}>
        {item.status}
      </Badge>
    );
  };
  
  if (viewMode === "grid") {
    return (
      <div className="border rounded-md p-4 hover:border-primary hover:shadow-sm cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-muted/40 rounded-md">
              {getIcon()}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {item.type !== "folder" ? `${item.type.toUpperCase()}${item.version ? ` • v${item.version}` : ""}` : "Folder"}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            By {item.owner}
          </p>
          {getStatusBadge()}
        </div>
        
        <div className="mt-1 text-xs text-muted-foreground">
          Updated {item.lastModified}
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-between border-b py-3 px-3 hover:bg-muted/50 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-muted/40 rounded-md">
          {getIcon()}
        </div>
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">
            {item.type !== "folder" ? `${item.type.toUpperCase()}${item.version ? ` • v${item.version}` : ""}` : "Folder"} • Updated {item.lastModified}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {getStatusBadge()}
        <p className="text-sm">{item.owner}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
