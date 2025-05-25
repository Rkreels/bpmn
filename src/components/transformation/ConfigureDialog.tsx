
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ConfigureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConfigureDialog: React.FC<ConfigureDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    autoApproval: false,
    notificationsEnabled: true,
    approvalThreshold: "10000",
    reportingFrequency: "weekly",
    integrationEndpoint: "",
    dataRetention: "12"
  });

  const handleSave = () => {
    toast({
      title: "Configuration Saved",
      description: "Transformation cockpit settings have been updated successfully."
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configure Transformation Settings</DialogTitle>
          <DialogDescription>Customize your transformation cockpit preferences</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <h4 className="font-medium">Approval Settings</h4>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-approval for small changes</Label>
                <p className="text-sm text-muted-foreground">Automatically approve changes below threshold</p>
              </div>
              <Switch
                checked={config.autoApproval}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, autoApproval: checked }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="threshold">Approval Threshold ($)</Label>
              <Input
                id="threshold"
                value={config.approvalThreshold}
                onChange={(e) => setConfig(prev => ({ ...prev, approvalThreshold: e.target.value }))}
                type="number"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Notifications</h4>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates on initiative progress</p>
              </div>
              <Switch
                checked={config.notificationsEnabled}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, notificationsEnabled: checked }))}
              />
            </div>
            <div className="grid gap-2">
              <Label>Reporting Frequency</Label>
              <Select value={config.reportingFrequency} onValueChange={(value) => setConfig(prev => ({ ...prev, reportingFrequency: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Integration Settings</h4>
            <div className="grid gap-2">
              <Label htmlFor="endpoint">API Endpoint</Label>
              <Input
                id="endpoint"
                value={config.integrationEndpoint}
                onChange={(e) => setConfig(prev => ({ ...prev, integrationEndpoint: e.target.value }))}
                placeholder="https://api.example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="retention">Data Retention (months)</Label>
              <Input
                id="retention"
                value={config.dataRetention}
                onChange={(e) => setConfig(prev => ({ ...prev, dataRetention: e.target.value }))}
                type="number"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
