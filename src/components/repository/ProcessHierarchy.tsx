
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen, 
  FileText,
  Plus,
  Move,
  Edit,
  Trash2,
  Settings,
  BarChart3
} from "lucide-react";

interface HierarchyNode {
  id: string;
  name: string;
  type: "folder" | "process" | "model";
  children?: HierarchyNode[];
  isExpanded?: boolean;
  metadata?: {
    owner?: string;
    lastModified?: string;
    status?: string;
    category?: string;
    processCount?: number;
  };
}

export const ProcessHierarchy: React.FC = () => {
  const [hierarchy, setHierarchy] = useState<HierarchyNode[]>([
    {
      id: "core-processes",
      name: "Core Business Processes",
      type: "folder",
      isExpanded: true,
      metadata: { processCount: 12 },
      children: [
        {
          id: "order-management",
          name: "Order Management",
          type: "folder",
          isExpanded: false,
          metadata: { processCount: 5 },
          children: [
            {
              id: "order-to-cash",
              name: "Order to Cash Process",
              type: "process",
              metadata: {
                owner: "Sarah Chen",
                lastModified: "2 days ago",
                status: "Published",
                category: "Core Process"
              }
            },
            {
              id: "order-fulfillment",
              name: "Order Fulfillment",
              type: "process",
              metadata: {
                owner: "Mike Rodriguez",
                lastModified: "1 week ago",
                status: "In Review",
                category: "Core Process"
              }
            }
          ]
        },
        {
          id: "customer-service",
          name: "Customer Service",
          type: "folder",
          isExpanded: true,
          metadata: { processCount: 4 },
          children: [
            {
              id: "complaint-handling",
              name: "Complaint Handling Process",
              type: "process",
              metadata: {
                owner: "Lisa Wang",
                lastModified: "3 days ago",
                status: "Published",
                category: "Customer Service"
              }
            },
            {
              id: "customer-onboarding",
              name: "Customer Onboarding",
              type: "process",
              metadata: {
                owner: "David Park",
                lastModified: "1 day ago",
                status: "Draft",
                category: "Customer Service"
              }
            }
          ]
        }
      ]
    },
    {
      id: "support-processes",
      name: "Support Processes",
      type: "folder",
      isExpanded: false,
      metadata: { processCount: 8 },
      children: [
        {
          id: "hr-processes",
          name: "Human Resources",
          type: "folder",
          isExpanded: false,
          metadata: { processCount: 6 },
          children: [
            {
              id: "employee-onboarding",
              name: "Employee Onboarding",
              type: "process",
              metadata: {
                owner: "HR Department",
                lastModified: "1 week ago",
                status: "Published",
                category: "HR Process"
              }
            },
            {
              id: "performance-review",
              name: "Performance Review Process",
              type: "process",
              metadata: {
                owner: "HR Department",
                lastModified: "2 weeks ago",
                status: "Published",
                category: "HR Process"
              }
            }
          ]
        },
        {
          id: "it-processes",
          name: "IT Operations",
          type: "folder",
          isExpanded: false,
          metadata: { processCount: 2 },
          children: [
            {
              id: "incident-management",
              name: "Incident Management",
              type: "process",
              metadata: {
                owner: "IT Department",
                lastModified: "5 days ago",
                status: "Published",
                category: "IT Process"
              }
            }
          ]
        }
      ]
    },
    {
      id: "compliance-processes",
      name: "Compliance & Governance",
      type: "folder",
      isExpanded: false,
      metadata: { processCount: 5 },
      children: [
        {
          id: "audit-process",
          name: "Internal Audit Process",
          type: "process",
          metadata: {
            owner: "Compliance Team",
            lastModified: "1 week ago",
            status: "Published",
            category: "Compliance"
          }
        },
        {
          id: "risk-assessment",
          name: "Risk Assessment",
          type: "process",
          metadata: {
            owner: "Risk Management",
            lastModified: "3 days ago",
            status: "In Review",
            category: "Risk Management"
          }
        }
      ]
    }
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const toggleExpanded = (nodeId: string) => {
    const updateNode = (nodes: HierarchyNode[]): HierarchyNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, isExpanded: !node.isExpanded };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    setHierarchy(updateNode(hierarchy));
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    const variants = {
      "Published": "default",
      "In Review": "secondary",
      "Draft": "outline",
      "Archived": "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"} className="text-xs">
        {status}
      </Badge>
    );
  };

  const renderNode = (node: HierarchyNode, level: number = 0) => {
    const isSelected = selectedNode === node.id;
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div key={node.id} className="select-none">
        <div
          className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-muted/50 ${
            isSelected ? "bg-primary/10 border border-primary/20" : ""
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => setSelectedNode(node.id)}
        >
          {/* Expand/Collapse Button */}
          {hasChildren ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(node.id);
              }}
            >
              {node.isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          ) : (
            <div className="w-4" />
          )}

          {/* Icon */}
          <div className="flex-shrink-0">
            {node.type === "folder" ? (
              node.isExpanded ? (
                <FolderOpen className="h-4 w-4 text-blue-500" />
              ) : (
                <Folder className="h-4 w-4 text-blue-500" />
              )
            ) : (
              <FileText className="h-4 w-4 text-gray-500" />
            )}
          </div>

          {/* Name and Metadata */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium truncate">{node.name}</span>
              {node.type === "folder" && node.metadata?.processCount && (
                <Badge variant="outline" className="text-xs">
                  {node.metadata.processCount}
                </Badge>
              )}
              {getStatusBadge(node.metadata?.status)}
            </div>
            {node.metadata && node.type === "process" && (
              <div className="text-xs text-muted-foreground mt-1">
                {node.metadata.owner} • {node.metadata.lastModified}
              </div>
            )}
          </div>

          {/* Actions */}
          {isSelected && (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Edit className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Move className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        {/* Children */}
        {hasChildren && node.isExpanded && (
          <div>
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Process Hierarchy
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Plus className="h-3 w-3 mr-2" />
              Add Folder
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-3 w-3 mr-2" />
              Manage
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {hierarchy.map(node => renderNode(node))}
        </div>

        {/* Quick Stats */}
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">25</div>
              <div className="text-xs text-muted-foreground">Total Processes</div>
            </div>
            <div>
              <div className="text-2xl font-bold">8</div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-muted-foreground">Contributors</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
