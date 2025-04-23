
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";

interface XmlSourceViewProps {
  xmlSource: string;
  onXmlChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const XmlSourceView: React.FC<XmlSourceViewProps> = ({
  xmlSource,
  onXmlChange
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">BPMN XML Source</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="flex-1 border rounded-md overflow-hidden">
        <textarea
          className="font-mono text-sm w-full h-full p-4 focus:outline-none resize-none"
          value={xmlSource}
          onChange={onXmlChange}
          spellCheck="false"
        ></textarea>
      </div>
    </div>
  );
};
