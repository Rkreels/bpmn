
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface XmlSourceViewProps {
  xmlSource: string;
  onXmlChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const XmlSourceView: React.FC<XmlSourceViewProps> = ({
  xmlSource,
  onXmlChange
}) => {
  return (
    <div className="h-full p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">BPMN 2.0 XML Source</h3>
        <p className="text-sm text-muted-foreground">
          Edit the BPMN XML directly or copy/paste from other tools
        </p>
      </div>
      <Textarea
        value={xmlSource}
        onChange={onXmlChange}
        className="h-full font-mono text-sm resize-none"
        placeholder="Enter BPMN 2.0 XML here..."
      />
    </div>
  );
};
