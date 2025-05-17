import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { CardMetric } from "@/components/ui/card-metric";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  BarChart, 
  LineChart, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Edit, 
  Trash, 
  FileSpreadsheet, 
  Download, 
  RefreshCw 
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useVoice } from "@/contexts/VoiceContext";

// Types for our initiatives
interface Initiative {
  id: string;
  name: string;
  status: string;
  impact: string;
  owner: string;
  progress: number;
  description: string;
}

export default function TransformationCockpit() {
  const { toast } = useToast();
  const { isVoiceEnabled, speakText } = useVoice();
  const [selectedView, setSelectedView] = useState("initiatives");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentInitiative, setCurrentInitiative] = useState<Initiative | null>(null);
  const [newInitiative, setNewInitiative] = useState({
    name: "",
    status: "planning",
    impact: "medium",
    owner: "",
    progress: 0,
    description: ""
  });

  // Sample initiatives data
  const [initiatives, setInitiatives] = useState<Initiative[]>([
    {
      id: "ini-001",
      name: "Digital Onboarding Process",
      status: "in-progress",
      impact: "high",
      owner: "Sarah Chen",
      progress: 65,
      description: "Automating customer onboarding process through digital channels to reduce paperwork and processing time."
    },
    {
      id: "ini-002",
      name: "AP/AR Process Optimization",
      status: "completed",
      impact: "medium",
      owner: "John Davis",
      progress: 100,
      description: "Streamlining accounts payable and accounts receivable processes through automated workflows."
    },
    {
      id: "ini-003",
      name: "Customer Support Redesign",
      status: "planning",
      impact: "high",
      owner: "Emily Rodriguez",
      progress: 25,
      description: "Reimagining customer support process with AI-based routing and resolution suggestions."
    },
    {
      id: "ini-004",
      name: "Supply Chain Visibility",
      status: "in-progress",
      impact: "critical",
      owner: "Michael Thompson",
      progress: 40,
      description: "Implementing end-to-end visibility in supply chain operations through IoT and blockchain integration."
    },
    {
      id: "ini-005",
      name: "HR Self-Service Portal",
      status: "planning",
      impact: "medium",
      owner: "Lisa Kumar",
      progress: 10,
      description: "Developing an employee self-service portal for HR requests and information."
    }
  ]);

  // Handle initiative creation
  const handleCreateInitiative = () => {
    const id = `ini-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    const progress = newInitiative.status === "completed" ? 100 : parseInt(newInitiative.progress.toString()) || 0;
    
    const initiative: Initiative = {
      id,
      name: newInitiative.name,
      status: newInitiative.status,
      impact: newInitiative.impact,
      owner: newInitiative.owner,
      progress,
      description: newInitiative.description
    };
    
    setInitiatives([...initiatives, initiative]);
    setIsCreateDialogOpen(false);
    
    // Reset form
    setNewInitiative({
      name: "",
      status: "planning",
      impact: "medium",
      owner: "",
      progress: 0,
      description: ""
    });

    if (isVoiceEnabled) {
      speakText("Initiative created successfully");
    }
    
    toast({
      title: "Initiative Created",
      description: "The new transformation initiative has been created successfully."
    });
  };

  // Handle initiative update
  const handleUpdateInitiative = () => {
    if (currentInitiative) {
      const updatedInitiatives = initiatives.map(ini => 
        ini.id === currentInitiative.id ? currentInitiative : ini
      );
      
      setInitiatives(updatedInitiatives);
      setIsEditDialogOpen(false);
      setCurrentInitiative(null);
      
      if (isVoiceEnabled) {
        speakText("Initiative updated successfully");
      }
      
      toast({
        title: "Initiative Updated",
        description: "The transformation initiative has been updated successfully."
      });
    }
  };

  // Handle initiative deletion
  const handleDeleteInitiative = () => {
    if (currentInitiative) {
      const filteredInitiatives = initiatives.filter(ini => ini.id !== currentInitiative.id);
      
      setInitiatives(filteredInitiatives);
      setIsDeleteDialogOpen(false);
      setCurrentInitiative(null);
      
      if (isVoiceEnabled) {
        speakText("Initiative deleted successfully");
      }
      
      toast({
        title: "Initiative Deleted",
        description: "The transformation initiative has been deleted successfully."
      });
    }
  };

  // Prepare for editing
  const handleEditClick = (initiative: Initiative) => {
    setCurrentInitiative(initiative);
    setIsEditDialogOpen(true);
  };

  // Prepare for deletion
  const handleDeleteClick = (initiative: Initiative) => {
    setCurrentInitiative(initiative);
    setIsDeleteDialogOpen(true);
  };

  // Handle voice guidance for metrics
  const handleMetricHover = (metricName: string) => {
    if (isVoiceEnabled) {
      speakText(`${metricName} metrics showing current transformation progress`);
    }
  };

  return (
    <MainLayout pageTitle="Transformation Cockpit">
      <div className="grid gap-4 md:gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardMetric
            title="Initiatives"
            value="5"
            icon={<PieChart className="h-5 w-5" />}
            trend={{ value: 20, isUpward: true, isPositive: true }}
          />
          <CardMetric
            title="Processes Optimized"
            value="12"
            icon={<BarChart className="h-5 w-5" />}
            trend={{ value: 15, isUpward: true, isPositive: true }}
            variant="primary"
          />
          <CardMetric
            title="Cost Reduction"
            value="$1.2M"
            icon={<TrendingUp className="h-5 w-5" />}
            trend={{ value: 8, isUpward: true, isPositive: true }}
            variant="success"
          />
          <CardMetric
            title="Cycle Time"
            value="-35%"
            icon={<TrendingDown className="h-5 w-5" />}
            trend={{ value: 35, isUpward: false, isPositive: true }}
            variant="warning"
          />
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium">Transformation Management</h3>
              <div className="flex gap-2">
                <Button onClick={() => setSelectedView("initiatives")} variant={selectedView === "initiatives" ? "default" : "outline"}>
                  Initiatives
                </Button>
                <Button onClick={() => setSelectedView("roadmap")} variant={selectedView === "roadmap" ? "default" : "outline"}>
                  Roadmap
                </Button>
                <Button onClick={() => setSelectedView("reports")} variant={selectedView === "reports" ? "default" : "outline"}>
                  Reports
                </Button>
              </div>
            </div>
            
            {selectedView === "initiatives" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium">Transformation Initiatives</h4>
                  <div className="flex gap-2">
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          New Initiative
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Initiative</DialogTitle>
                          <DialogDescription>
                            Add a new transformation initiative to your portfolio.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input 
                              id="name" 
                              value={newInitiative.name} 
                              onChange={(e) => setNewInitiative({...newInitiative, name: e.target.value})} 
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="status">Status</Label>
                              <Select 
                                value={newInitiative.status} 
                                onValueChange={(value) => setNewInitiative({...newInitiative, status: value})}
                              >
                                <SelectTrigger id="status">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="planning">Planning</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="impact">Business Impact</Label>
                              <Select 
                                value={newInitiative.impact} 
                                onValueChange={(value) => setNewInitiative({...newInitiative, impact: value})}
                              >
                                <SelectTrigger id="impact">
                                  <SelectValue placeholder="Select impact" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="owner">Owner</Label>
                            <Input 
                              id="owner" 
                              value={newInitiative.owner} 
                              onChange={(e) => setNewInitiative({...newInitiative, owner: e.target.value})}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="progress">Progress (%)</Label>
                            <Input 
                              id="progress" 
                              type="number" 
                              min="0" 
                              max="100" 
                              value={newInitiative.progress} 
                              onChange={(e) => setNewInitiative({...newInitiative, progress: parseInt(e.target.value) || 0})}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                              id="description" 
                              value={newInitiative.description} 
                              onChange={(e) => setNewInitiative({...newInitiative, description: e.target.value})}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                          <Button type="submit" onClick={handleCreateInitiative}>Create</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline">
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" onClick={() => {
                      toast({
                        title: "Refreshed",
                        description: "Initiative data has been refreshed"
                      });
                    }}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="planning">Planning</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-0">
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Impact</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {initiatives.map((initiative) => (
                            <TableRow key={initiative.id}>
                              <TableCell className="font-medium">{initiative.name}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  initiative.status === 'planning' ? 'bg-blue-100 text-blue-800' :
                                  initiative.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {initiative.status === 'planning' ? 'Planning' :
                                   initiative.status === 'in-progress' ? 'In Progress' : 'Completed'}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  initiative.impact === 'low' ? 'bg-gray-100 text-gray-800' :
                                  initiative.impact === 'medium' ? 'bg-blue-100 text-blue-800' :
                                  initiative.impact === 'high' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {initiative.impact.charAt(0).toUpperCase() + initiative.impact.slice(1)}
                                </span>
                              </TableCell>
                              <TableCell>{initiative.owner}</TableCell>
                              <TableCell>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className={`h-2.5 rounded-full ${
                                      initiative.progress < 30 ? 'bg-blue-600' :
                                      initiative.progress < 70 ? 'bg-yellow-600' : 'bg-green-600'
                                    }`}
                                    style={{ width: `${initiative.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500 mt-1 block">{initiative.progress}%</span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditClick(initiative)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteClick(initiative)}
                                >
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  {/* Filter initiatives by status for other tabs */}
                  <TabsContent value="in-progress">
                    {/* Similar table with filtered data */}
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Impact</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {initiatives
                            .filter(initiative => initiative.status === 'in-progress')
                            .map((initiative) => (
                              <TableRow key={initiative.id}>
                                <TableCell className="font-medium">{initiative.name}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    initiative.impact === 'low' ? 'bg-gray-100 text-gray-800' :
                                    initiative.impact === 'medium' ? 'bg-blue-100 text-blue-800' :
                                    initiative.impact === 'high' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {initiative.impact.charAt(0).toUpperCase() + initiative.impact.slice(1)}
                                  </span>
                                </TableCell>
                                <TableCell>{initiative.owner}</TableCell>
                                <TableCell>
                                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                      className="h-2.5 rounded-full bg-yellow-600"
                                      style={{ width: `${initiative.progress}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-500 mt-1 block">{initiative.progress}%</span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditClick(initiative)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  {/* Other tabs with filtered content */}
                  <TabsContent value="planning">
                    {/* Similar table filtered for planning status */}
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Impact</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {initiatives
                            .filter(initiative => initiative.status === 'planning')
                            .map((initiative) => (
                              <TableRow key={initiative.id}>
                                <TableCell className="font-medium">{initiative.name}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    initiative.impact === 'low' ? 'bg-gray-100 text-gray-800' :
                                    initiative.impact === 'medium' ? 'bg-blue-100 text-blue-800' :
                                    initiative.impact === 'high' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {initiative.impact.charAt(0).toUpperCase() + initiative.impact.slice(1)}
                                  </span>
                                </TableCell>
                                <TableCell>{initiative.owner}</TableCell>
                                <TableCell>
                                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                      className="h-2.5 rounded-full bg-blue-600"
                                      style={{ width: `${initiative.progress}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-500 mt-1 block">{initiative.progress}%</span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditClick(initiative)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="completed">
                    {/* Similar table filtered for completed status */}
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Impact</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Completed Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {initiatives
                            .filter(initiative => initiative.status === 'completed')
                            .map((initiative) => (
                              <TableRow key={initiative.id}>
                                <TableCell className="font-medium">{initiative.name}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    initiative.impact === 'low' ? 'bg-gray-100 text-gray-800' :
                                    initiative.impact === 'medium' ? 'bg-blue-100 text-blue-800' :
                                    initiative.impact === 'high' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {initiative.impact.charAt(0).toUpperCase() + initiative.impact.slice(1)}
                                  </span>
                                </TableCell>
                                <TableCell>{initiative.owner}</TableCell>
                                <TableCell>May 15, 2023</TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {/* Roadmap view */}
            {selectedView === "roadmap" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium">Transformation Roadmap</h4>
                </div>
                <div className="border rounded-md p-6 bg-muted/20 flex items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground">Roadmap visualization will be displayed here</p>
                    <p className="text-sm text-muted-foreground">Timeline view with initiative milestones and dependencies</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Reports view */}
            {selectedView === "reports" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium">Transformation Reports</h4>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Reports
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium mb-2">Initiative Progress</h5>
                    <div className="bg-muted/20 rounded-md flex items-center justify-center h-[200px]">
                      <span className="text-muted-foreground">Progress chart placeholder</span>
                    </div>
                  </div>
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium mb-2">Impact Analysis</h5>
                    <div className="bg-muted/20 rounded-md flex items-center justify-center h-[200px]">
                      <span className="text-muted-foreground">Impact chart placeholder</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Initiative</DialogTitle>
            <DialogDescription>
              Update the details of this transformation initiative.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input 
                id="edit-name" 
                value={currentInitiative?.name || ''} 
                onChange={(e) => setCurrentInitiative(
                  currentInitiative ? {...currentInitiative, name: e.target.value} : null
                )} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={currentInitiative?.status || ''} 
                  onValueChange={(value) => setCurrentInitiative(
                    currentInitiative ? {...currentInitiative, status: value} : null
                  )}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-impact">Business Impact</Label>
                <Select 
                  value={currentInitiative?.impact || ''} 
                  onValueChange={(value) => setCurrentInitiative(
                    currentInitiative ? {...currentInitiative, impact: value} : null
                  )}
                >
                  <SelectTrigger id="edit-impact">
                    <SelectValue placeholder="Select impact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-owner">Owner</Label>
              <Input 
                id="edit-owner" 
                value={currentInitiative?.owner || ''} 
                onChange={(e) => setCurrentInitiative(
                  currentInitiative ? {...currentInitiative, owner: e.target.value} : null
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-progress">Progress (%)</Label>
              <Input 
                id="edit-progress" 
                type="number" 
                min="0" 
                max="100" 
                value={currentInitiative?.progress || 0} 
                onChange={(e) => setCurrentInitiative(
                  currentInitiative ? {...currentInitiative, progress: parseInt(e.target.value) || 0} : null
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description" 
                value={currentInitiative?.description || ''} 
                onChange={(e) => setCurrentInitiative(
                  currentInitiative ? {...currentInitiative, description: e.target.value} : null
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleUpdateInitiative}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the initiative "{currentInitiative?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteInitiative}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
