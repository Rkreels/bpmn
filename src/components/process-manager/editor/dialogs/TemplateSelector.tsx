
import React from 'react';
import { ProcessTemplateSelector } from '../../ProcessTemplateSelector';

interface TemplateSelectorProps {
  onLoadTemplate: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onLoadTemplate }) => {
  return (
    <ProcessTemplateSelector 
      onLoadTemplate={onLoadTemplate}
      onPreviewTemplate={(templateId) => console.log('Preview:', templateId)}
    />
  );
};
