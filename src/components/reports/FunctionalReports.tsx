import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useIndustry } from "@/contexts/IndustryContext";
import { getIndustryData, DemoReport, DemoDashboard } from "@/data/industryDemoData";
import { Plus, Search, Filter, Download, Eye, Edit, Trash2 } from "lucide-react";

export function FunctionalReports() {
  const { currentIndustry } = useIndustry();
  const industryData = getIndustryData(currentIndustry);
  const [reports, setReports] = useState<DemoReport[]>(industryData.reports);
  const [dashboards, setDashboards] = useState<DemoDashboard[]>(industryData.dashboards);
  const [activeTab, setActiveTab] = useState("reports");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);
  const [isCreateDashOpen, setIsCreateDashOpen] = useState(false);
  const [reportForm, setReportForm] = useState({ name: '', type: 'dashboard' as DemoReport['type'], category: '', description: '', frequency: 'Weekly' });
  const [dashForm, setDashForm] = useState({ name: '', description: '', widgets: 6, isPublic: false });
  const { toast } = useToast();

  useEffect(() => { const d = getIndustryData(currentIndustry); setReports(d.reports); setDashboards(d.dashboards); }, [currentIndustry]);

  const handleCreateReport = () => {
    const r: DemoReport = { id: `r${Date.now()}`, ...reportForm, lastRun: new Date().toISOString(), status: 'draft', views: 0, creator: 'Current User' };
    setReports(prev => [...prev, r]);
    setIsCreateReportOpen(false);
    setReportForm({ name: '', type: 'dashboard', category: '', description: '', frequency: 'Weekly' });
    toast({ title: "Report Created", description: `Created: ${r.name}` });
  };

  const handleCreateDashboard = () => {
    const d: DemoDashboard = { id: `d${Date.now()}`, ...dashForm, lastUpdated: new Date().toISOString(), views: 0 };
    setDashboards(prev => [...prev, d]);
    setIsCreateDashOpen(false);
    setDashForm({ name: '', description: '', widgets: 6, isPublic: false });
    toast({ title: "Dashboard Created", description: `Created: ${d.name}` });
  };

  const handleRunReport = (r: DemoReport) => {
    setReports(prev => prev.map(rep => rep.id === r.id ? { ...rep, lastRun: new Date().toISOString(), views: rep.views + 1 } : rep));
    toast({ title: "Report Generated", description: `Generated: ${r.name}` });
  };

  const handleExportReport = (r: DemoReport) => {
    const blob = new Blob([JSON.stringify(r, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${r.name.replace(/\s+/g, '_')}.json`; a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Export Complete", description: `${r.name} exported` });
  };

  const handleDeleteReport = (id: string) => { setReports(prev => prev.filter(r => r.id !== id)); toast({ title: "Deleted", description: "Report deleted" }); };
  const handleDeleteDashboard = (id: string) => { setDashboards(prev => prev.filter(d => d.id !== id)); toast({ title: "Deleted", description: "Dashboard deleted" }); };
  const handleViewDashboard = (d: DemoDashboard) => { setDashboards(prev => prev.map(db => db.id === d.id ? { ...db, views: db.views + 1 } : db)); toast({ title: "Dashboard Opened", description: `Opening ${d.name}` }); };

  const filteredReports = reports.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.category.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredDashboards = dashboards.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl sm:text-3xl font-bold">Reports & Analytics</h1><p className="text-muted-foreground">Generate insights and track performance</p></div>
        <Button onClick={() => setIsCreateReportOpen(true)}><Plus className="h-4 w-4 mr-2" />New Report</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Reports</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{reports.length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Dashboards</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{dashboards.length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Total Views</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{reports.reduce((s, r) => s + r.views, 0) + dashboards.reduce((s, d) => s + d.views, 0)}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Scheduled</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{reports.filter(r => r.type === 'scheduled').length}</div></CardContent></Card>
      </div>

      <div className="relative max-w-sm"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-8" /></div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="reports">Reports</TabsTrigger><TabsTrigger value="dashboards">Dashboards</TabsTrigger></TabsList>
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map(report => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader><div className="flex items-center justify-between"><CardTitle className="text-lg">{report.name}</CardTitle><Badge variant={report.status === 'active' ? 'default' : 'secondary'}>{report.status}</Badge></div><CardDescription>{report.description}</CardDescription></CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm"><div><span className="text-muted-foreground">Category:</span> {report.category}</div><div><span className="text-muted-foreground">Freq:</span> {report.frequency}</div></div>
                  <div className="text-sm"><span className="text-muted-foreground">Views:</span> {report.views} • <span className="text-muted-foreground">By:</span> {report.creator}</div>
                  <div className="flex gap-2"><Button size="sm" onClick={() => handleRunReport(report)}><Eye className="h-3 w-3 mr-1" />Run</Button><Button size="sm" variant="outline" onClick={() => handleExportReport(report)}><Download className="h-3 w-3 mr-1" />Export</Button><Button size="sm" variant="outline" onClick={() => handleDeleteReport(report.id)}><Trash2 className="h-3 w-3 mr-1" /></Button></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="dashboards" className="space-y-4">
          <div className="flex justify-end"><Button onClick={() => setIsCreateDashOpen(true)}><Plus className="h-4 w-4 mr-2" />Create Dashboard</Button></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDashboards.map(dash => (
              <Card key={dash.id} className="hover:shadow-md transition-shadow">
                <CardHeader><div className="flex items-center justify-between"><CardTitle className="text-lg">{dash.name}</CardTitle><Badge variant={dash.isPublic ? 'default' : 'secondary'}>{dash.isPublic ? 'Public' : 'Private'}</Badge></div><CardDescription>{dash.description}</CardDescription></CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm"><div><span className="text-muted-foreground">Widgets:</span> {dash.widgets}</div><div><span className="text-muted-foreground">Views:</span> {dash.views}</div></div>
                  <div className="flex gap-2"><Button size="sm" onClick={() => handleViewDashboard(dash)}><Eye className="h-3 w-3 mr-1" />View</Button><Button size="sm" variant="outline" onClick={() => handleDeleteDashboard(dash.id)}><Trash2 className="h-3 w-3 mr-1" /></Button></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isCreateReportOpen} onOpenChange={setIsCreateReportOpen}><DialogContent><DialogHeader><DialogTitle>Create Report</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Name *</Label><Input value={reportForm.name} onChange={e => setReportForm(p => ({...p, name: e.target.value}))} /></div>
          <div><Label>Description</Label><Textarea value={reportForm.description} onChange={e => setReportForm(p => ({...p, description: e.target.value}))} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Category</Label><Input value={reportForm.category} onChange={e => setReportForm(p => ({...p, category: e.target.value}))} /></div>
            <div><Label>Frequency</Label><Select value={reportForm.frequency} onValueChange={v => setReportForm(p => ({...p, frequency: v}))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Daily">Daily</SelectItem><SelectItem value="Weekly">Weekly</SelectItem><SelectItem value="Monthly">Monthly</SelectItem><SelectItem value="Quarterly">Quarterly</SelectItem></SelectContent></Select></div>
          </div>
          <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setIsCreateReportOpen(false)}>Cancel</Button><Button onClick={handleCreateReport}>Create</Button></div>
        </div>
      </DialogContent></Dialog>

      <Dialog open={isCreateDashOpen} onOpenChange={setIsCreateDashOpen}><DialogContent><DialogHeader><DialogTitle>Create Dashboard</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Name *</Label><Input value={dashForm.name} onChange={e => setDashForm(p => ({...p, name: e.target.value}))} /></div>
          <div><Label>Description</Label><Textarea value={dashForm.description} onChange={e => setDashForm(p => ({...p, description: e.target.value}))} /></div>
          <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setIsCreateDashOpen(false)}>Cancel</Button><Button onClick={handleCreateDashboard}>Create</Button></div>
        </div>
      </DialogContent></Dialog>
    </div>
  );
}
