
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { complexProcessTemplates } from "@/data/processTemplates";
import { FileText, Download, Eye } from "lucide-react";

interface ProcessTemplateSelectorProps {
  onLoadTemplate: (templateId: string) => void;
  onPreviewTemplate?: (templateId: string) => void;
}

export const ProcessTemplateSelector: React.FC<ProcessTemplateSelectorProps> = ({
  onLoadTemplate,
  onPreviewTemplate
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Process Templates</h3>
        <Badge variant="outline">{complexProcessTemplates.length} available</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {complexProcessTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                </div>
                <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Elements:</span>
                  <span className="font-medium">{template.elements.length}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Version:</span>
                  <span className="font-medium">{template.properties.version}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Author:</span>
                  <span className="font-medium">{template.properties.author}</span>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    onClick={() => onLoadTemplate(template.id)}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Load
                  </Button>
                  {onPreviewTemplate && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onPreviewTemplate(template.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
