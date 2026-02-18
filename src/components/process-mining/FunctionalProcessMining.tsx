import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useIndustry } from '@/contexts/IndustryContext';
import { getIndustryData } from '@/data/industryDemoData';
import { Upload, Play, Download, BarChart3, CheckCircle, AlertTriangle, Users, TrendingUp, Trash2 } from 'lucide-react';

interface EventLog {
  id: string; name: string; status: 'uploading' | 'processing' | 'ready' | 'error'; progress: number; events: number; cases: number; activities: number;
}

interface MiningProject {
  id: string; name: string; status: string; lastAnalysis: string; eventCount: number; caseCount: number;
}

export const FunctionalProcessMining: React.FC = () => {
  const { currentIndustry } = useIndustry();
  getIndustryData(currentIndustry); // trigger re-read on industry change
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  // Industry-specific mining projects
  const [projects, setProjects] = useState<MiningProject[]>([]);

  useEffect(() => {
    const industryProjects: Record<string, MiningProject[]> = {
      manufacturing: [
        { id: 'mp1', name: 'Production Line Bottleneck Analysis', status: 'Completed', lastAnalysis: '2026-02-14', eventCount: 125000, caseCount: 3400 },
        { id: 'mp2', name: 'Quality Control Process Discovery', status: 'In Progress', lastAnalysis: '2026-02-10', eventCount: 85000, caseCount: 2100 },
        { id: 'mp3', name: 'Supply Chain Lead Time Mining', status: 'Ready', lastAnalysis: '2026-02-01', eventCount: 210000, caseCount: 5600 },
      ],
      healthcare: [
        { id: 'mp1', name: 'Patient Flow Analysis - ED', status: 'Completed', lastAnalysis: '2026-02-13', eventCount: 340000, caseCount: 12000 },
        { id: 'mp2', name: 'Medication Administration Conformance', status: 'In Progress', lastAnalysis: '2026-02-11', eventCount: 180000, caseCount: 8500 },
        { id: 'mp3', name: 'Revenue Cycle Process Discovery', status: 'Ready', lastAnalysis: '2026-02-05', eventCount: 450000, caseCount: 15000 },
      ],
      construction: [
        { id: 'mp1', name: 'Project Delivery Timeline Mining', status: 'Completed', lastAnalysis: '2026-02-12', eventCount: 95000, caseCount: 1200 },
        { id: 'mp2', name: 'Change Order Process Analysis', status: 'In Progress', lastAnalysis: '2026-02-08', eventCount: 45000, caseCount: 800 },
        { id: 'mp3', name: 'Safety Compliance Process Check', status: 'Ready', lastAnalysis: '2026-02-03', eventCount: 120000, caseCount: 3500 },
      ],
      financial: [
        { id: 'mp1', name: 'Loan Approval Process Mining', status: 'Completed', lastAnalysis: '2026-02-14', eventCount: 520000, caseCount: 28000 },
        { id: 'mp2', name: 'AML Transaction Pattern Discovery', status: 'In Progress', lastAnalysis: '2026-02-12', eventCount: 1200000, caseCount: 95000 },
        { id: 'mp3', name: 'Claims Processing Conformance', status: 'Ready', lastAnalysis: '2026-02-06', eventCount: 380000, caseCount: 18000 },
      ],
      retail: [
        { id: 'mp1', name: 'Order-to-Delivery Process Mining', status: 'Completed', lastAnalysis: '2026-02-15', eventCount: 890000, caseCount: 45000 },
        { id: 'mp2', name: 'Returns Processing Analysis', status: 'In Progress', lastAnalysis: '2026-02-11', eventCount: 230000, caseCount: 12000 },
        { id: 'mp3', name: 'Customer Journey Path Discovery', status: 'Ready', lastAnalysis: '2026-02-07', eventCount: 1500000, caseCount: 85000 },
      ],
    };
    setProjects(industryProjects[currentIndustry] || industryProjects.manufacturing);
    setAnalysisResults(null);
  }, [currentIndustry]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const newLog: EventLog = { id: `log-${Date.now()}`, name: file.name, status: 'uploading', progress: 0, events: 0, cases: 0, activities: 0 };
    setEventLogs(prev => [...prev, newLog]);
    toast({ title: "Upload Started", description: `Uploading ${file.name}...` });

    const uploadInterval = setInterval(() => {
      setEventLogs(prev => prev.map(log => {
        if (log.id === newLog.id && log.progress < 100) { const np = Math.min(log.progress + 10, 100); return { ...log, progress: np, status: np === 100 ? 'processing' : 'uploading' }; }
        return log;
      }));
    }, 300);

    setTimeout(() => {
      clearInterval(uploadInterval);
      setEventLogs(prev => prev.map(log => log.id === newLog.id ? { ...log, status: 'ready', progress: 100, events: Math.floor(Math.random() * 10000) + 1000, cases: Math.floor(Math.random() * 1000) + 100, activities: Math.floor(Math.random() * 50) + 10 } : log));
      toast({ title: "Upload Complete", description: `${file.name} processed successfully` });
    }, 3000);
    event.target.value = '';
  }, [toast]);

  const handleAnalyze = useCallback((logId: string) => {
    const log = eventLogs.find(l => l.id === logId);
    if (!log) return;
    setIsAnalyzing(true);
    toast({ title: "Analysis Started", description: `Analyzing ${log.name}...` });
    setTimeout(() => {
      setAnalysisResults({
        logId, processVariants: Math.floor(Math.random() * 20) + 5, avgCaseDuration: (Math.random() * 10 + 1).toFixed(1),
        bottlenecks: Math.floor(Math.random() * 3) + 1, efficiency: (Math.random() * 30 + 70).toFixed(1), conformance: (Math.random() * 20 + 80).toFixed(1),
        recommendations: ["Reduce waiting time in approval activities", "Parallelize independent tasks", "Automate manual data entry steps"]
      });
      setIsAnalyzing(false);
      toast({ title: "Analysis Complete", description: `Found process variants with optimization opportunities` });
    }, 4000);
  }, [eventLogs, toast]);

  const handleDeleteLog = (logId: string) => {
    setEventLogs(prev => prev.filter(l => l.id !== logId));
    toast({ title: "Log Removed", description: "Event log removed" });
  };

  const handleExportResults = useCallback(() => {
    if (!analysisResults) return;
    const blob = new Blob([JSON.stringify({ timestamp: new Date().toISOString(), ...analysisResults }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `process-mining-results-${Date.now()}.json`; a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Results Exported", description: "Analysis results downloaded" });
  }, [analysisResults, toast]);

  const handleRunProject = (projectId: string) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: 'In Progress', lastAnalysis: new Date().toISOString().split('T')[0] } : p));
    toast({ title: "Analysis Running", description: "Project analysis started" });
    setTimeout(() => {
      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: 'Completed' } : p));
      toast({ title: "Analysis Complete", description: "Project analysis finished" });
    }, 3000);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    toast({ title: "Project Deleted", description: "Mining project removed" });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{projects.length}</div><div className="text-sm text-muted-foreground">Mining Projects</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{projects.filter(p => p.status === 'Completed').length}</div><div className="text-sm text-muted-foreground">Completed</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{eventLogs.length}</div><div className="text-sm text-muted-foreground">Event Logs</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{projects.reduce((s, p) => s + p.eventCount, 0).toLocaleString()}</div><div className="text-sm text-muted-foreground">Total Events</div></CardContent></Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3"><TabsTrigger value="overview">Projects</TabsTrigger><TabsTrigger value="upload">Event Logs</TabsTrigger><TabsTrigger value="results">Analysis Results</TabsTrigger></TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {projects.map(project => (
              <Card key={project.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap"><h3 className="font-semibold">{project.name}</h3><Badge variant={project.status === 'Completed' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'}>{project.status}</Badge></div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Events: {project.eventCount.toLocaleString()}</span><span>Cases: {project.caseCount.toLocaleString()}</span><span>Last: {project.lastAnalysis}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleRunProject(project.id)} disabled={project.status === 'In Progress'}><Play className="h-4 w-4 mr-1" />{project.status === 'In Progress' ? 'Running...' : 'Analyze'}</Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteProject(project.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Upload className="h-5 w-5" />Event Log Upload</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Upload Event Log (CSV, XES, JSON)</Label><Input type="file" accept=".csv,.xes,.json" onChange={handleFileUpload} className="mt-2" /></div>
              {eventLogs.length > 0 && (<div className="space-y-3"><h4 className="font-medium">Uploaded Event Logs</h4>
                {eventLogs.map(log => (
                  <div key={log.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2"><span className="font-medium">{log.name}</span><Badge variant={log.status === 'ready' ? 'default' : log.status === 'error' ? 'destructive' : 'secondary'}>{log.status}</Badge></div>
                      <div className="flex gap-2">
                        {log.status === 'ready' && <Button size="sm" onClick={() => handleAnalyze(log.id)} disabled={isAnalyzing}><Play className="h-4 w-4 mr-1" />Analyze</Button>}
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteLog(log.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                    {log.status !== 'ready' && <Progress value={log.progress} className="mb-2" />}
                    {log.status === 'ready' && (
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-1"><BarChart3 className="h-4 w-4" />{log.events.toLocaleString()} events</div>
                        <div className="flex items-center gap-1"><Users className="h-4 w-4" />{log.cases.toLocaleString()} cases</div>
                        <div className="flex items-center gap-1"><CheckCircle className="h-4 w-4" />{log.activities} activities</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          {isAnalyzing && (<Card><CardContent className="p-8 text-center"><div className="flex items-center justify-center gap-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /><div><p className="font-medium">Analyzing Process Data...</p><p className="text-sm text-muted-foreground">This may take a few moments</p></div></div></CardContent></Card>)}
          {analysisResults ? (
            <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />Analysis Results</CardTitle><Button onClick={handleExportResults} variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Export</Button></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-blue-600">{analysisResults.processVariants}</div><div className="text-sm text-muted-foreground">Process Variants</div></CardContent></Card>
                  <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{analysisResults.avgCaseDuration}h</div><div className="text-sm text-muted-foreground">Avg Duration</div></CardContent></Card>
                  <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-orange-600">{analysisResults.efficiency}%</div><div className="text-sm text-muted-foreground">Efficiency</div></CardContent></Card>
                  <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-purple-600">{analysisResults.conformance}%</div><div className="text-sm text-muted-foreground">Conformance</div></CardContent></Card>
                </div>
                <div className="space-y-4">
                  <div><h4 className="font-medium mb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-orange-500" />Bottlenecks: {analysisResults.bottlenecks}</h4></div>
                  <div><h4 className="font-medium mb-2">Recommendations</h4><ul className="space-y-2">{analysisResults.recommendations.map((rec: string, i: number) => <li key={i} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /><span className="text-sm">{rec}</span></li>)}</ul></div>
                </div>
              </CardContent>
            </Card>
          ) : !isAnalyzing && (
            <Card><CardContent className="p-8 text-center"><p className="text-muted-foreground">No analysis results yet. Upload an event log and run analysis, or select a project to analyze.</p></CardContent></Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
