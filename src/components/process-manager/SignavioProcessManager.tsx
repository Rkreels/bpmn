import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createBpmnExporter } from './BpmnExporter';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { demoProcesses } from '@/data/processManagerDemoData';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Panel,
  NodeTypes,
  BackgroundVariant,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Play,
  Square,
  Circle,
  Diamond,
  Save,
  Download,
  FileText,
  Users,
  Zap,
  Database,
  Layers,
  Share2,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Home,
  MoreHorizontal,
  Plus,
  X,
  User,
  Code,
  Mail,
  HardDrive
} from 'lucide-react';

// Enhanced BPMN Node Components matching SAP Signavio style
const StartEventNode = ({ data, selected }: { data: any; selected?: boolean }) => (
  <>
    <div className={cn(
      "w-10 h-10 rounded-full border-2 bg-green-50 flex items-center justify-center shadow-sm transition-all",
      selected ? "border-green-600 ring-2 ring-green-200" : "border-green-500",
      "hover:shadow-md cursor-pointer"
    )}>
      <Play className="w-4 h-4 text-green-700 fill-green-700" />
    </div>
    <Handle type="source" position={Position.Right} />
  </>
);

const EndEventNode = ({ data, selected }: { data: any; selected?: boolean }) => (
  <>
    <div className={cn(
      "w-10 h-10 rounded-full border-4 bg-red-50 flex items-center justify-center shadow-sm transition-all",
      selected ? "border-red-600 ring-2 ring-red-200" : "border-red-500",
      "hover:shadow-md cursor-pointer"
    )}>
      <Square className="w-3 h-3 text-red-700 fill-red-700" />
    </div>
    <Handle type="target" position={Position.Left} />
  </>
);

const TaskNode = ({ data, selected }: { data: any; selected?: boolean }) => (
  <>
    <div className={cn(
      "min-w-28 h-16 bg-blue-50 border-2 rounded-lg flex flex-col items-center justify-center p-2 shadow-sm transition-all",
      selected ? "border-blue-600 ring-2 ring-blue-200" : "border-blue-400",
      "hover:shadow-md cursor-pointer"
    )}>
      <div className="text-xs font-semibold text-blue-900 text-center truncate w-full">
        {data.label || 'Task'}
      </div>
      {data.type === 'user' && (
        <User className="w-3 h-3 text-blue-600 mt-1" />
      )}
      {data.type === 'service' && (
        <Zap className="w-3 h-3 text-blue-600 mt-1" />
      )}
      {data.type === 'send' && (
        <Mail className="w-3 h-3 text-blue-600 mt-1" />
      )}
    </div>
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} />
  </>
);

const GatewayNode = ({ data, selected }: { data: any; selected?: boolean }) => (
  <>
    <div className={cn(
      "w-12 h-12 bg-yellow-50 border-2 transform rotate-45 flex items-center justify-center shadow-sm transition-all",
      selected ? "border-yellow-600 ring-2 ring-yellow-200" : "border-yellow-500",
      "hover:shadow-md cursor-pointer"
    )}>
      <div className="transform -rotate-45">
        {data.gatewayType === 'exclusive' && <X className="w-4 h-4 text-yellow-700" />}
        {data.gatewayType === 'parallel' && <Plus className="w-4 h-4 text-yellow-700" />}
        {data.gatewayType === 'inclusive' && <Circle className="w-4 h-4 text-yellow-700" />}
      </div>
    </div>
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} />
    <Handle type="source" position={Position.Bottom} />
  </>
);

// Node types registry
const nodeTypes: NodeTypes = {
  startEvent: StartEventNode,
  endEvent: EndEventNode,
  task: TaskNode,
  userTask: TaskNode,
  serviceTask: TaskNode,
  sendTask: TaskNode,
  exclusiveGateway: GatewayNode,
  parallelGateway: GatewayNode,
  inclusiveGateway: GatewayNode,
};

// Element Palette Component
const ElementPalette = ({ 
  isVisible, 
  onToggle, 
  onAddElement 
}: { 
  isVisible: boolean; 
  onToggle: () => void; 
  onAddElement: (type: string, elementData: any) => void;
}) => {
  const elementTypes = [
    { type: 'startEvent', label: 'Start Event', icon: Play, color: 'green' },
    { type: 'endEvent', label: 'End Event', icon: Square, color: 'red' },
    { type: 'task', label: 'Task', icon: FileText, color: 'blue' },
    { type: 'userTask', label: 'User Task', icon: User, color: 'blue' },
    { type: 'serviceTask', label: 'Service Task', icon: Zap, color: 'blue' },
    { type: 'sendTask', label: 'Send Task', icon: Mail, color: 'blue' },
    { type: 'exclusiveGateway', label: 'Exclusive Gateway', icon: Diamond, color: 'yellow' },
    { type: 'parallelGateway', label: 'Parallel Gateway', icon: Diamond, color: 'yellow' },
  ];

  const handleDragStart = (event: React.DragEvent, elementType: string) => {
    event.dataTransfer.setData('application/reactflow', elementType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card className={cn(
      "absolute left-4 top-4 z-10 transition-all duration-300",
      isVisible ? "w-64" : "w-12"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            {isVisible && <CardTitle className="text-sm">Elements</CardTitle>}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-6 w-6 p-0"
          >
            {isVisible ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </Button>
        </div>
      </CardHeader>
      
      {isVisible && (
        <CardContent className="pt-0">
          <ScrollArea className="h-96">
            <div className="grid gap-2">
              {elementTypes.map((element) => {
                const IconComponent = element.icon;
                return (
                  <div
                    key={element.type}
                    draggable
                    onDragStart={(e) => handleDragStart(e, element.type)}
                    className="flex items-center gap-2 p-2 border rounded-lg cursor-grab hover:bg-muted transition-colors"
                  >
                    <IconComponent className={cn("w-4 h-4", `text-${element.color}-600`)} />
                    <span className="text-xs font-medium">{element.label}</span>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      )}
    </Card>
  );
};

// Process Properties Panel
const ProcessPropertiesPanel = ({ 
  selectedNode,
  onUpdateNode,
  isVisible, 
  onToggle 
}: { 
  selectedNode: Node | null;
  onUpdateNode: (id: string, updates: any) => void;
  isVisible: boolean; 
  onToggle: () => void;
}) => {
  const [nodeLabel, setNodeLabel] = useState<string>(selectedNode?.data?.label as string || '');
  const [nodeType, setNodeType] = useState<string>(selectedNode?.data?.type as string || '');
  const [assignee, setAssignee] = useState<string>(selectedNode?.data?.assignee as string || '');

  useEffect(() => {
    if (selectedNode) {
      setNodeLabel(selectedNode.data?.label as string || '');
      setNodeType(selectedNode.data?.type as string || '');
      setAssignee(selectedNode.data?.assignee as string || '');
    }
  }, [selectedNode]);

  const handleUpdateNode = () => {
    if (selectedNode) {
      onUpdateNode(selectedNode.id, {
        ...selectedNode.data,
        label: nodeLabel,
        type: nodeType,
        assignee: assignee
      });
    }
  };

  return (
    <Card className={cn(
      "absolute right-4 top-4 z-10 transition-all duration-300",
      isVisible ? "w-80" : "w-12"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {isVisible && <CardTitle className="text-sm">Properties</CardTitle>}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-6 w-6 p-0"
          >
            {isVisible ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </Button>
        </div>
      </CardHeader>
      
      {isVisible && (
        <CardContent className="space-y-4">
          {selectedNode ? (
            <>
              <div>
                <Label className="text-xs font-medium">Element ID</Label>
                <div className="text-xs text-muted-foreground mt-1 p-2 bg-muted rounded">
                  {selectedNode.id}
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium">Label</Label>
                <Input
                  value={nodeLabel}
                  onChange={(e) => setNodeLabel(e.target.value)}
                  onBlur={handleUpdateNode}
                  className="mt-1 h-8 text-xs"
                />
              </div>
              
              <div>
                <Label className="text-xs font-medium">Type</Label>
                <Select value={nodeType} onValueChange={(value: string) => {
                  setNodeType(value);
                  if (selectedNode) {
                    onUpdateNode(selectedNode.id, {
                      ...selectedNode.data,
                      type: value
                    });
                  }
                }}>
                  <SelectTrigger className="mt-1 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User Task</SelectItem>
                    <SelectItem value="service">Service Task</SelectItem>
                    <SelectItem value="send">Send Task</SelectItem>
                    <SelectItem value="manual">Manual Task</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(nodeType === 'user' || nodeType === 'manual') && (
                <div>
                  <Label className="text-xs font-medium">Assignee</Label>
                  <Input
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    onBlur={handleUpdateNode}
                    placeholder="Enter assignee"
                    className="mt-1 h-8 text-xs"
                  />
                </div>
              )}
              
              <div>
                <Label className="text-xs font-medium">Position</Label>
                <div className="text-xs text-muted-foreground mt-1 p-2 bg-muted rounded">
                  X: {Math.round(selectedNode.position.x)}, Y: {Math.round(selectedNode.position.y)}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground text-xs py-8">
              Select an element to view properties
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

// Demo Process Loader Component
const DemoProcessLoader = ({ 
  onLoadDemo 
}: { 
  onLoadDemo: (nodes: Node[], edges: Edge[], processName: string) => void 
}) => {
  const [selectedDemo, setSelectedDemo] = useState<string>('');
  const { toast } = useToast();

  const handleLoadDemo = () => {
    const demo = demoProcesses.find(p => p.id === selectedDemo);
    if (!demo) {
      toast({
        title: "Error",
        description: "Please select a demo process",
        variant: "destructive"
      });
      return;
    }

    // Convert demo elements to ReactFlow format
    const demoNodes: Node[] = demo.elements.map(element => ({
      id: element.id,
      type: element.type,
      position: element.position || { x: element.x || 0, y: element.y || 0 },
      data: element.data || { label: element.name || 'Element' }
    }));

    const demoEdges: Edge[] = demo.connections.map(connection => ({
      id: connection.id,
      source: connection.source,
      target: connection.target,
      type: connection.type || 'smoothstep',
      animated: connection.animated || false
    }));

    onLoadDemo(demoNodes, demoEdges, demo.name);
    
    toast({
      title: "Demo Loaded",
      description: `${demo.name} has been loaded successfully`
    });
  };

  const categorizedDemos = demoProcesses.reduce((acc, demo) => {
    if (!acc[demo.category]) acc[demo.category] = [];
    acc[demo.category].push(demo);
    return acc;
  }, {} as Record<string, typeof demoProcesses>);

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Load Demo Process</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-xs font-medium mb-2 block">Select Demo Process</Label>
          <Select value={selectedDemo} onValueChange={setSelectedDemo}>
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Choose a demo process" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(categorizedDemos).map(([category, demos]) => (
                <div key={category}>
                  <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {category}
                  </div>
                  {(demos as any[]).map((demo) => (
                    <SelectItem key={demo.id} value={demo.id} className="text-xs">
                      {demo.name}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedDemo && (
          <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
            {demoProcesses.find(p => p.id === selectedDemo)?.description}
          </div>
        )}
        
        <Button 
          onClick={handleLoadDemo} 
          disabled={!selectedDemo}
          className="w-full h-9"
          size="sm"
        >
          Load Demo Process
        </Button>
      </CardContent>
    </Card>
  );
};

// Main Component
export const SignavioProcessManager = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [paletteVisible, setPaletteVisible] = useState(true);
  const [propertiesVisible, setPropertiesVisible] = useState(true);
  const [processName, setProcessName] = useState('Untitled Process');
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onSelectionChange = useCallback((params: any) => {
    if (params.nodes && params.nodes.length > 0) {
      setSelectedNode(params.nodes[0]);
    } else {
      setSelectedNode(null);
    }
  }, []);

  const onUpdateNode = useCallback((id: string, updates: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: updates } : node
      )
    );
  }, [setNodes]);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowBounds) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: Node = {
        id: `${type}_${Date.now()}`,
        type,
        position,
        data: { 
          label: type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1'),
          type: type.includes('Task') ? 'user' : undefined
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleSave = () => {
    const processData = {
      name: processName,
      nodes,
      edges,
      savedAt: new Date().toISOString()
    };
    
    // In a real app, save to backend
    localStorage.setItem('bpmn_process', JSON.stringify(processData));
    
    toast({
      title: "Process Saved",
      description: `${processName} has been saved successfully`
    });
  };

  const handleExport = async () => {
    try {
      const exporter = createBpmnExporter();
      const bpmnXml = exporter.exportToBpmn(nodes, edges, processName);
      
      const blob = new Blob([bpmnXml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${processName.replace(/\s+/g, '_')}.bpmn`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: "BPMN file has been downloaded"
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not export BPMN file",
        variant: "destructive"
      });
    }
  };

  const handleLoadDemo = (demoNodes: Node[], demoEdges: Edge[], demoName: string) => {
    setNodes(demoNodes);
    setEdges(demoEdges);
    setProcessName(demoName);
  };

  return (
    <ErrorBoundary>
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Layers className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <Input
                value={processName}
                onChange={(e) => setProcessName(e.target.value)}
                className="font-semibold text-sm border-none bg-transparent p-0 h-auto focus-visible:ring-0"
              />
              <div className="text-xs text-muted-foreground">Process Manager</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <DemoProcessLoader onLoadDemo={handleLoadDemo} />
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export BPMN
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onSelectionChange={onSelectionChange}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background"
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: false,
            style: { strokeWidth: 2, stroke: '#64748b' }
          }}
        >
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={16} 
            size={1}
            color="#e2e8f0"
          />
          <Controls 
            position="bottom-left"
            className="bg-background border rounded-lg shadow-lg"
          />
          <MiniMap 
            position="bottom-right"
            className="bg-background border rounded-lg shadow-lg"
            pannable
            zoomable
          />
        </ReactFlow>

        {/* Element Palette */}
        <ElementPalette
          isVisible={paletteVisible}
          onToggle={() => setPaletteVisible(!paletteVisible)}
          onAddElement={() => {}}
        />

        {/* Properties Panel */}
        <ProcessPropertiesPanel
          selectedNode={selectedNode}
          onUpdateNode={onUpdateNode}
          isVisible={propertiesVisible}
          onToggle={() => setPropertiesVisible(!propertiesVisible)}
        />
      </div>
    </div>
    </ErrorBoundary>
  );
};