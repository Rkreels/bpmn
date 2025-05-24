
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Filter, 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Download,
  Settings,
  Activity,
  Users,
  Clock,
  TrendingUp
} from "lucide-react";

export const ProcessExplorer: React.FC = () => {
  const [activityThreshold, setActivityThreshold] = useState([80]);
  const [pathThreshold, setPathThreshold] = useState([60]);
  const [selectedView, setSelectedView] = useState("activities");
  const [isAnimating, setIsAnimating] = useState(false);

  const processMetrics = {
    totalCases: 15420,
    totalActivities: 234,
    totalVariants: 87,
    averageDuration: "3.2 days",
    medianDuration: "2.1 days",
    conformanceRate: "89.5%"
  };

  const topActivities = [
    { name: "Create Purchase Order", frequency: 15420, avgDuration: "2.3h", automation: 85 },
    { name: "Approve Request", frequency: 14850, avgDuration: "4.1h", automation: 23 },
    { name: "Vendor Selection", frequency: 12340, avgDuration: "1.8d", automation: 67 },
    { name: "Invoice Processing", frequency: 11200, avgDuration: "3.2h", automation: 91 },
    { name: "Payment Authorization", frequency: 9870, avgDuration: "1.2h", automation: 45 }
  ];

  const processVariants = [
    { id: 1, frequency: 2341, percentage: 15.2, activities: 8, avgDuration: "2.1d" },
    { id: 2, frequency: 1892, percentage: 12.3, activities: 9, avgDuration: "2.8d" },
    { id: 3, frequency: 1567, percentage: 10.2, activities: 7, avgDuration: "1.9d" },
    { id: 4, frequency: 1234, percentage: 8.0, activities: 10, avgDuration: "3.4d" },
    { id: 5, frequency: 987, percentage: 6.4, activities: 6, avgDuration: "1.5d" }
  ];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Process Explorer
              </CardTitle>
              <CardDescription>
                Interactive process discovery and exploration
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant={isAnimating ? "default" : "outline"} 
                size="sm"
                onClick={() => setIsAnimating(!isAnimating)}
              >
                {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isAnimating ? "Pause" : "Animate"}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">View Type</label>
              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activities">Activities</SelectItem>
                  <SelectItem value="handovers">Handovers</SelectItem>
                  <SelectItem value="resources">Resources</SelectItem>
                  <SelectItem value="variants">Variants</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Activity Threshold: {activityThreshold[0]}%
              </label>
              <Slider
                value={activityThreshold}
                onValueChange={setActivityThreshold}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Path Threshold: {pathThreshold[0]}%
              </label>
              <Slider
                value={pathThreshold}
                onValueChange={setPathThreshold}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="flex items-end gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Process Visualization */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>Process Map</CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ZoomOut className="h-4 w-4" />
                  <ZoomIn className="h-4 w-4" />
                </div>
                <Separator orientation="vertical" className="h-4" />
                <Badge variant="outline">{processMetrics.totalCases} cases</Badge>
                <Badge variant="outline">{processMetrics.totalVariants} variants</Badge>
              </div>
            </CardHeader>
            <CardContent className="h-full">
              <div className="h-full bg-muted/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="text-center space-y-4">
                  <div className="relative">
                    {/* Simulated Process Flow Visualization */}
                    <svg width="500" height="300" className="mx-auto">
                      {/* Start Event */}
                      <circle cx="50" cy="150" r="20" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
                      <text x="50" y="155" textAnchor="middle" className="text-xs fill-white font-medium">Start</text>
                      
                      {/* Activities */}
                      <rect x="120" y="120" width="80" height="60" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" rx="8" />
                      <text x="160" y="145" textAnchor="middle" className="text-xs fill-white">Create PO</text>
                      <text x="160" y="160" textAnchor="middle" className="text-xs fill-white">2,341 cases</text>
                      
                      <rect x="250" y="80" width="80" height="60" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2" rx="8" />
                      <text x="290" y="105" textAnchor="middle" className="text-xs fill-white">Approve</text>
                      <text x="290" y="120" textAnchor="middle" className="text-xs fill-white">1,892 cases</text>
                      
                      <rect x="250" y="180" width="80" height="60" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="8" />
                      <text x="290" y="205" textAnchor="middle" className="text-xs fill-white">Review</text>
                      <text x="290" y="220" textAnchor="middle" className="text-xs fill-white">987 cases</text>
                      
                      <rect x="380" y="120" width="80" height="60" fill="#06b6d4" stroke="#0891b2" strokeWidth="2" rx="8" />
                      <text x="420" y="145" textAnchor="middle" className="text-xs fill-white">Process</text>
                      <text x="420" y="160" textAnchor="middle" className="text-xs fill-white">2,234 cases</text>
                      
                      {/* End Event */}
                      <circle cx="500" cy="150" r="20" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
                      <text x="500" y="155" textAnchor="middle" className="text-xs fill-white font-medium">End</text>
                      
                      {/* Connections */}
                      <path d="M 70 150 Q 95 150 120 150" fill="none" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrowhead)" />
                      <path d="M 200 150 Q 225 130 250 110" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                      <path d="M 200 150 Q 225 180 250 210" fill="none" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrowhead)" />
                      <path d="M 330 110 Q 355 130 380 150" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                      <path d="M 330 210 Q 355 180 380 150" fill="none" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrowhead)" />
                      <path d="M 460 150 Q 480 150 500 150" fill="none" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrowhead)" />
                      
                      {/* Arrow marker definition */}
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                        </marker>
                      </defs>
                    </svg>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{processMetrics.conformanceRate}</div>
                      <div className="text-sm text-muted-foreground">Conformance Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{processMetrics.averageDuration}</div>
                      <div className="text-sm text-muted-foreground">Avg Duration</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Process Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Process Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/20 rounded">
                  <div className="text-xl font-bold">{processMetrics.totalCases.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Cases</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded">
                  <div className="text-xl font-bold">{processMetrics.totalActivities}</div>
                  <div className="text-xs text-muted-foreground">Activities</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded">
                  <div className="text-xl font-bold">{processMetrics.totalVariants}</div>
                  <div className="text-xs text-muted-foreground">Variants</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded">
                  <div className="text-xl font-bold">{processMetrics.medianDuration}</div>
                  <div className="text-xs text-muted-foreground">Median Duration</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{activity.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {activity.frequency.toLocaleString()} cases • {activity.avgDuration}
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {activity.automation}% auto
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Process Variants */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Process Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {processVariants.map((variant) => (
                  <div key={variant.id} className="p-3 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Variant {variant.id}</span>
                      <Badge>{variant.percentage}%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>{variant.frequency.toLocaleString()} cases</div>
                      <div>{variant.activities} activities • {variant.avgDuration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
