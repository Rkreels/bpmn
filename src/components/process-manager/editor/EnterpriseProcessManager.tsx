
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProcessTemplateSelector } from '../ProcessTemplateSelector';

interface EnterpriseProcessManagerProps {
  onLoadTemplate: (templateId: string) => void;
  onCreateTemplate: () => void;
  onUpdateTemplate: () => void;
  onDeleteTemplate: () => void;
}

export const EnterpriseProcessManager: React.FC<EnterpriseProcessManagerProps> = ({
  onLoadTemplate,
  onCreateTemplate,
  onUpdateTemplate,
  onDeleteTemplate
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Enterprise Process Repository</CardTitle>
      </CardHeader>
      <CardContent>
        <ProcessTemplateSelector 
          onLoadTemplate={onLoadTemplate}
          onPreviewTemplate={(templateId) => console.log('Preview:', templateId)}
        />
      </CardContent>
    </Card>
  );
};
