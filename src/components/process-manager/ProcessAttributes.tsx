
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileCode, Plus, Save, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AttributeGroup {
  id: string;
  name: string;
  attributes: Attribute[];
}

interface Attribute {
  id: string;
  key: string;
  value: string;
  type: "text" | "number" | "boolean" | "date" | "select";
  options?: string[];
}

const attributeGroups: AttributeGroup[] = [
  {
    id: "basic",
    name: "Basic Information",
    attributes: [
      { id: "id", key: "Process ID", value: "OTC-2023-04", type: "text" },
      { id: "owner", key: "Process Owner", value: "Finance Department", type: "text" },
      { id: "category", key: "Process Category", value: "Financial", type: "select", options: ["Financial", "HR", "IT", "Sales", "Operations"] },
      { id: "priority", key: "Priority", value: "High", type: "select", options: ["Low", "Medium", "High", "Critical"] },
    ]
  },
  {
    id: "metadata",
    name: "Metadata",
    attributes: [
      { id: "description", key: "Description", value: "End-to-end process for managing customer orders and payments", type: "text" },
      { id: "compliance", key: "Compliance Standards", value: "ISO 9001, SOX", type: "text" },
      { id: "review-date", key: "Next Review Date", value: "2023-10-15", type: "date" },
      { id: "status", key: "Status", value: "Draft", type: "select", options: ["Draft", "Under Review", "Approved", "Published", "Retired"] },
    ]
  },
  {
    id: "performance",
    name: "Performance Indicators",
    attributes: [
      { id: "cycle-time", key: "Average Cycle Time", value: "3", type: "number" },
      { id: "cycle-time-unit", key: "Cycle Time Unit", value: "Days", type: "select", options: ["Hours", "Days", "Weeks"] },
      { id: "cost", key: "Cost per Execution", value: "150", type: "number" },
      { id: "automation", key: "Automation Level", value: "60", type: "number" },
    ]
  }
];

export const ProcessAttributes: React.FC = () => {
  const { toast } = useToast();

  const handleSaveAttributes = () => {
    toast({
      title: "Attributes Saved",
      description: "Process attributes have been updated successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Process Attributes</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Settings className="h-4 w-4" />
            Configure Attributes
          </Button>
          <Button size="sm" className="gap-1" onClick={handleSaveAttributes}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
      
      {attributeGroups.map((group) => (
        <div key={group.id} className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="text-md font-medium">{group.name}</h4>
            <Badge variant="outline" className="text-xs">
              {group.attributes.length} attributes
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.attributes.map((attr) => (
              <div key={attr.id} className="space-y-2">
                <Label htmlFor={attr.id}>{attr.key}</Label>
                
                {attr.type === "text" && (
                  <Input id={attr.id} value={attr.value} onChange={() => {}} />
                )}
                
                {attr.type === "number" && (
                  <Input id={attr.id} type="number" value={attr.value} onChange={() => {}} />
                )}
                
                {attr.type === "date" && (
                  <Input id={attr.id} type="date" value={attr.value} onChange={() => {}} />
                )}
                
                {attr.type === "select" && (
                  <select 
                    id={attr.id}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={attr.value}
                    onChange={() => {}}
                  >
                    {attr.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Attribute
            </Button>
          </div>
          
          <Separator className="my-4" />
        </div>
      ))}
      
      <div className="bg-muted/50 p-4 rounded-md">
        <div className="flex items-start gap-3">
          <FileCode className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <h4 className="font-medium">Custom XML Properties</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Add custom XML properties to be stored with the BPMN file
            </p>
            <Textarea 
              rows={5}
              placeholder="<custom:property name='value' />"
              className="font-mono text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
