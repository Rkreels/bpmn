
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useProcessMiningData } from "@/hooks/useProcessMiningData";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import {
  Search,
  Filter,
  Zap,
  Clock,
  Users,
  TrendingUp,
  BarChart3,
  Download,
  Play
} from "lucide-react";

export const ProcessExplorer: React.FC = () => {
  const { variants, processCases, bottlenecks, runAnalysis, exportData } = useProcessMiningData();
  const { toast } = useToast();
  const { speakText } = useVoice();
  const [selectedVariant, setSelectedVariant] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredCases = processCases.filter(case_ => {
    const matchesSearch = case_.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.processName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || case_.status === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleDiscoverProcess = () => {
    toast({
      title: "Process Discovery Started",
      description: "Analyzing event logs to discover process variants..."
    });
    speakText("Starting process discovery. This will identify all unique process paths and their frequencies.");
    runAnalysis("discovery");
  };

  const handleExportResults = () => {
    const filename = exportData("pdf", "process-variants");
    toast({
      title: "Export Complete",
      description: `Process variants exported as ${filename}`
    });
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases or processes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDiscoverProcess}>
                <Play className="h-4 w-4 mr-2" />
                Discover Process
              </Button>
              <Button variant="outline" onClick={handleExportResults}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Process Variants</CardTitle>
          <CardDescription>Different paths discovered in your process execution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {variants.map((variant) => (
              <div key={variant.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">Variant {variant.id.slice(-1)}</h3>
                      <Badge variant="outline">{variant.frequency}% frequency</Badge>
                      <Badge variant="secondary">{variant.cases.length} cases</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Avg Duration: {variant.avgDuration.toFixed(1)} hours
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Analyze
                  </Button>
                </div>
                
                {/* Process Flow */}
                <div className="flex flex-wrap items-center gap-2">
                  {variant.path.map((activity, index) => (
                    <React.Fragment key={index}>
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm">
                        {activity}
                      </div>
                      {index < variant.path.length - 1 && (
                        <div className="text-muted-foreground">→</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cases Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Process Cases</CardTitle>
          <CardDescription>Individual case instances and their execution details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Case ID</th>
                  <th className="text-left p-2">Process</th>
                  <th className="text-left p-2">Duration</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Variant</th>
                  <th className="text-right p-2">Activities</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((case_) => (
                  <tr key={case_.id} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{case_.caseId}</td>
                    <td className="p-2">{case_.processName}</td>
                    <td className="p-2">{case_.duration?.toFixed(1)}h</td>
                    <td className="p-2">
                      <Badge 
                        variant={case_.status === "completed" ? "default" : 
                                case_.status === "running" ? "secondary" : "destructive"}
                      >
                        {case_.status}
                      </Badge>
                    </td>
                    <td className="p-2">{case_.variant}</td>
                    <td className="p-2 text-right">{case_.activities.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bottlenecks */}
      <Card>
        <CardHeader>
          <CardTitle>Identified Bottlenecks</CardTitle>
          <CardDescription>Activities causing delays in your process execution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bottlenecks.map((bottleneck) => (
              <div key={bottleneck.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{bottleneck.activityName}</h3>
                      <Badge 
                        variant={bottleneck.severity === "high" ? "destructive" : 
                                bottleneck.severity === "medium" ? "secondary" : "outline"}
                      >
                        {bottleneck.severity} severity
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Wait Time: {bottleneck.avgWaitTime.toFixed(1)}h • 
                      Frequency: {bottleneck.frequency} cases
                    </div>
                  </div>
                  <Zap className="h-5 w-5 text-orange-500" />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
                  <ul className="text-sm space-y-1">
                    {bottleneck.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
