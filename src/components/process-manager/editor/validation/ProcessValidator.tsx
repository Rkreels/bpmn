
import React from 'react';
import { BpmnElement, BpmnConnection } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

interface ValidationRule {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  elementId?: string;
}

interface ProcessValidatorProps {
  elements: BpmnElement[];
  connections: BpmnConnection[];
  onElementHighlight: (elementId: string | null) => void;
}

export const ProcessValidator: React.FC<ProcessValidatorProps> = ({
  elements,
  connections,
  onElementHighlight
}) => {
  const validateProcess = (): ValidationRule[] => {
    const rules: ValidationRule[] = [];

    // Check for start events
    const startEvents = elements.filter(el => el.type === 'start-event');
    if (startEvents.length === 0) {
      rules.push({
        id: 'no-start-event',
        type: 'error',
        message: 'Process must have at least one start event'
      });
    } else if (startEvents.length > 1) {
      rules.push({
        id: 'multiple-start-events',
        type: 'warning',
        message: 'Process has multiple start events'
      });
    }

    // Check for end events
    const endEvents = elements.filter(el => el.type === 'end-event');
    if (endEvents.length === 0) {
      rules.push({
        id: 'no-end-event',
        type: 'error',
        message: 'Process must have at least one end event'
      });
    }

    // Check for disconnected elements
    elements.forEach(element => {
      const hasIncoming = connections.some(conn => conn.target === element.id);
      const hasOutgoing = connections.some(conn => conn.source === element.id);
      
      if (!hasIncoming && element.type !== 'start-event') {
        rules.push({
          id: `no-incoming-${element.id}`,
          type: 'warning',
          message: `Element "${element.name}" has no incoming connections`,
          elementId: element.id
        });
      }
      
      if (!hasOutgoing && element.type !== 'end-event') {
        rules.push({
          id: `no-outgoing-${element.id}`,
          type: 'warning',
          message: `Element "${element.name}" has no outgoing connections`,
          elementId: element.id
        });
      }
    });

    // Check for gateway validation
    elements.filter(el => el.type.includes('gateway')).forEach(gateway => {
      const incoming = connections.filter(conn => conn.target === gateway.id);
      const outgoing = connections.filter(conn => conn.source === gateway.id);
      
      if (gateway.type === 'exclusive-gateway' && outgoing.length < 2) {
        rules.push({
          id: `gateway-paths-${gateway.id}`,
          type: 'warning',
          message: `Exclusive gateway "${gateway.name}" should have at least 2 outgoing paths`,
          elementId: gateway.id
        });
      }
    });

    // Check for naming conventions
    elements.forEach(element => {
      if (!element.name || element.name.trim() === '') {
        rules.push({
          id: `unnamed-${element.id}`,
          type: 'info',
          message: `Element should have a descriptive name`,
          elementId: element.id
        });
      }
    });

    return rules;
  };

  const validationRules = validateProcess();
  const errors = validationRules.filter(rule => rule.type === 'error');
  const warnings = validationRules.filter(rule => rule.type === 'warning');
  const infos = validationRules.filter(rule => rule.type === 'info');

  const getIcon = (type: string) => {
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
      case 'warning': return 'outline';
      case 'info': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Process Validation
          {validationRules.length === 0 && (
            <Badge variant="outline" className="text-green-600 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Valid
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{errors.length}</div>
            <div className="text-xs text-muted-foreground">Errors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{warnings.length}</div>
            <div className="text-xs text-muted-foreground">Warnings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{infos.length}</div>
            <div className="text-xs text-muted-foreground">Info</div>
          </div>
        </div>

        {validationRules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <p className="font-medium">Process is valid!</p>
            <p className="text-sm">All validation rules passed successfully.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {validationRules.map(rule => (
              <div
                key={rule.id}
                className={`p-3 rounded border cursor-pointer hover:bg-muted/50 ${
                  rule.elementId ? 'hover:border-primary' : ''
                }`}
                onClick={() => rule.elementId && onElementHighlight(rule.elementId)}
              >
                <div className="flex items-start gap-3">
                  {getIcon(rule.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{rule.message}</p>
                    {rule.elementId && (
                      <Badge variant={getBadgeVariant(rule.type)} className="mt-2">
                        Element: {elements.find(el => el.id === rule.elementId)?.name || rule.elementId}
                      </Badge>
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
