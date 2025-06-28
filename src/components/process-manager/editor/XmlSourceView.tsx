
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Upload, FileText } from 'lucide-react';

interface XmlSourceViewProps {
  xmlSource: string;
  onXmlChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const XmlSourceView: React.FC<XmlSourceViewProps> = ({
  xmlSource,
  onXmlChange
}) => {
  const handleExportXml = () => {
    const blob = new Blob([xmlSource || getDefaultXml()], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `process-model-${Date.now()}.bpmn`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        // Simulate the textarea change event
        const syntheticEvent = {
          target: { value: content }
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onXmlChange(syntheticEvent);
      };
      reader.readAsText(file);
    }
  };

  const getDefaultXml = () => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" 
                  xmlns:di="http://www.omg.org/spec/DD/20100524/DI" 
                  id="Definitions_1" 
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" name="Start">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_1" name="Sample Task">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_1" name="End">
      <bpmn:incoming>Flow_2</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="EndEvent_1" />
  </bpmn:process>
</bpmn:definitions>`;
  };

  return (
    <div className="h-full p-4">
      <Card className="h-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              BPMN XML Source
            </CardTitle>
            <div className="flex gap-2">
              <input
                type="file"
                accept=".bpmn,.xml"
                onChange={handleImportFile}
                className="hidden"
                id="xml-file-input"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('xml-file-input')?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportXml}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-full">
          <Textarea
            value={xmlSource || getDefaultXml()}
            onChange={onXmlChange}
            className="h-full font-mono text-sm resize-none"
            placeholder="BPMN XML source code will appear here..."
          />
        </CardContent>
      </Card>
    </div>
  );
};
