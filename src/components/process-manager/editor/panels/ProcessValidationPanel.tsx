
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, XCircle, Info, X } from "lucide-react";

interface ProcessValidationPanelProps {
  elements: any[];
  connections: any[];
  onClose: () => void;
}

interface ValidationIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  element?: string;
  message: string;
  description?: string;
}

export const ProcessValidationPanel: React.FC<ProcessValidationPanelProps> = ({
  elements,
  connections,
  onClose
}) => {
  const validationResults = useMemo(() => {
    const issues: ValidationIssue[] = [];

    // Check for orphaned elements
    const connectedElements = new Set();
    connections.forEach(conn => {
      connectedElements.add(conn.source);
      connectedElements.add(conn.target);
    });

    elements.forEach(element => {
      if (!connectedElements.has(element.id) && element.type !== 'start-event' && element.type !== 'end-event') {
        issues.push({
          id: `orphaned-${element.id}`,
          type: 'warning',
          element: element.id,
          message: `Orphaned element: ${element.name}`,
          description: 'This element is not connected to any other elements in the process flow.'
        });
      }
    });

    // Check for missing start events
    const startEvents = elements.filter(el => el.type === 'start-event');
    if (startEvents.length === 0) {
      issues.push({
        id: 'no-start-event',
        type: 'error',
        message: 'Missing start event',
        description: 'Every process must have at least one start event to define the entry point.'
      });
    } else if (startEvents.length > 1) {
      issues.push({
        id: 'multiple-start-events',
        type: 'warning',
        message: 'Multiple start events',
        description: 'Consider if multiple start events are necessary for this process.'
      });
    }

    // Check for missing end events
    const endEvents = elements.filter(el => el.type === 'end-event');
    if (endEvents.length === 0) {
      issues.push({
        id: 'no-end-event',
        type: 'error',
        message: 'Missing end event',
        description: 'Every process must have at least one end event to define the completion point.'
      });
    }

    // Check for elements without names
    elements.forEach(element => {
      if (!element.name || element.name.trim() === '') {
        issues.push({
          id: `unnamed-${element.id}`,
          type: 'warning',
          element: element.id,
          message: `Unnamed ${element.type}`,
          description: 'Elements should have descriptive names for better process understanding.'
        });
      }
    });

    // Check for gateways without proper connections
    const gateways = elements.filter(el => el.type === 'exclusive-gateway' || el.type === 'parallel-gateway');
    gateways.forEach(gateway => {
      const incomingConnections = connections.filter(conn => conn.target === gateway.id);
      const outgoingConnections = connections.filter(conn => conn.source === gateway.id);

      if (incomingConnections.length === 0) {
        issues.push({
          id: `gateway-no-input-${gateway.id}`,
          type: 'error',
          element: gateway.id,
          message: `Gateway ${gateway.name} has no incoming connections`,
          description: 'Gateways must have at least one incoming connection.'
        });
      }

      if (outgoingConnections.length < 2) {
        issues.push({
          id: `gateway-insufficient-output-${gateway.id}`,
          type: 'warning',
          element: gateway.id,
          message: `Gateway ${gateway.name} should have multiple outgoing paths`,
          description: 'Gateways typically split the flow into multiple paths.'
        });
      }
    });

    // Check for tasks without assignees
    const tasks = elements.filter(el => el.type === 'user-task');
    tasks.forEach(task => {
      if (!task.assignee || task.assignee.trim() === '') {
        issues.push({
          id: `task-no-assignee-${task.id}`,
          type: 'info',
          element: task.id,
          message: `Task ${task.name} has no assignee`,
          description: 'Consider assigning tasks to specific roles or users for better accountability.'
        });
      }
    });

    // Performance recommendations
    if (elements.length > 20) {
      issues.push({
        id: 'complex-process',
        type: 'info',
        message: 'Complex process detected',
        description: 'Consider breaking down complex processes into sub-processes for better maintainability.'
      });
    }

    return issues;
  }, [elements, connections]);

  const errorCount = validationResults.filter(issue => issue.type === 'error').length;
  const warningCount = validationResults.filter(issue => issue.type === 'warning').length;
  const infoCount = validationResults.filter(issue => issue.type === 'info').length;

  const getIconForType = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'error': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'outline';
      default: return 'default';
    }
  };

  return (
    <Card className="fixed right-4 top-32 w-80 max-h-[60vh] overflow-hidden z-30 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Process Validation
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2 mt-2">
          {errorCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {errorCount} Errors
            </Badge>
          )}
          {warningCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {warningCount} Warnings
            </Badge>
          )}
          {infoCount > 0 && (
            <Badge variant="outline" className="text-xs">
              {infoCount} Info
            </Badge>
          )}
          {validationResults.length === 0 && (
            <Badge variant="default" className="text-xs bg-green-100 text-green-800">
              All Good ✓
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 max-h-[40vh] overflow-y-auto">
        {validationResults.length === 0 ? (
          <div className="text-center py-4">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No validation issues found. Your process looks good!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {validationResults.map((issue) => (
              <div
                key={issue.id}
                className="border rounded-lg p-3 text-sm hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-2">
                  {getIconForType(issue.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{issue.message}</span>
                      <Badge variant={getBadgeVariant(issue.type)} className="text-xs">
                        {issue.type}
                      </Badge>
                    </div>
                    {issue.description && (
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {issue.description}
                      </p>
                    )}
                    {issue.element && (
                      <p className="text-muted-foreground text-xs mt-1">
                        Element: {issue.element}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
