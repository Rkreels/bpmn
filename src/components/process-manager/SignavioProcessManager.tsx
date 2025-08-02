import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  <div className={cn(
    "w-10 h-10 rounded-full border-2 bg-green-50 flex items-center justify-center shadow-sm transition-all",
    selected ? "border-green-600 ring-2 ring-green-200" : "border-green-500",
    "hover:shadow-md cursor-pointer"
  )}>
    <Play className="w-4 h-4 text-green-700 fill-green-700" />
  </div>
);

const EndEventNode = ({ data, selected }: { data: any; selected?: boolean }) => (
  <div className={cn(
    "w-10 h-10 rounded-full border-4 bg-red-50 flex items-center justify-center shadow-sm transition-all",
    selected ? "border-red-600 ring-2 ring-red-200" : "border-red-500",
    "hover:shadow-md cursor-pointer"
  )}>
    <Square className="w-3 h-3 text-red-700 fill-red-700" />
  </div>
);

const TaskNode = ({ data, selected }: { data: any; selected?: boolean }) => (
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
  </div>
);

const GatewayNode = ({ data, selected }: { data: any; selected?: boolean }) => (
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
);

const SubProcessNode = ({ data, selected }: { data: any; selected?: boolean }) => (
  <div className={cn(
    "min-w-36 h-20 bg-purple-50 border-2 rounded-lg flex flex-col items-center justify-center p-2 shadow-sm transition-all relative",
    selected ? "border-purple-600 ring-2 ring-purple-200" : "border-purple-400",
    "hover:shadow-md cursor-pointer"
  )}>
    <div className="text-xs font-semibold text-purple-900 text-center truncate w-full">
      {data.label || 'Sub Process'}
    </div>
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
      <Square className="w-3 h-3 text-purple-600 border border-purple-600" />
    </div>
  </div>
);

const nodeTypes: NodeTypes = {
  startEvent: StartEventNode,
  endEvent: EndEventNode,
  task: TaskNode,
  gateway: GatewayNode,
  subprocess: SubProcessNode,
};

const initialNodes: Node[] = [
  {
    id: 'start-1',
    type: 'startEvent',
    position: { x: 150, y: 200 },
    data: { label: 'Start Process' },
  },
  {
    id: 'task-1',
    type: 'task',
    position: { x: 300, y: 180 },
    data: { label: 'Review Request', type: 'user' },
  },
  {
    id: 'gateway-1',
    type: 'gateway',
    position: { x: 480, y: 185 },
    data: { label: 'Approved?', gatewayType: 'exclusive' },
  },
  {
    id: 'task-2',
    type: 'task',
    position: { x: 600, y: 120 },
    data: { label: 'Process Request', type: 'service' },
  },
  {
    id: 'task-3',
    type: 'task',
    position: { x: 600, y: 250 },
    data: { label: 'Send Rejection', type: 'user' },
  },
  {
    id: 'end-1',
    type: 'endEvent',
    position: { x: 780, y: 200 },
    data: { label: 'End Process' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'start-1', target: 'task-1', type: 'smoothstep' },
  { id: 'e2-3', source: 'task-1', target: 'gateway-1', type: 'smoothstep' },
  { id: 'e3-4', source: 'gateway-1', target: 'task-2', type: 'smoothstep', label: 'Yes' },
  { id: 'e3-5', source: 'gateway-1', target: 'task-3', type: 'smoothstep', label: 'No' },
  { id: 'e4-6', source: 'task-2', target: 'end-1', type: 'smoothstep' },
  { id: 'e5-6', source: 'task-3', target: 'end-1', type: 'smoothstep' },
];

// SAP Signavio Style Header
const SignavioHeader = ({ 
  processName, 
  onSave, 
  onExport, 
  onShare,
  isCollaborating = false 
}: {
  processName: string;
  onSave: () => void;
  onExport: () => void;
  onShare: () => void;
  isCollaborating?: boolean;
}) => {
  return (
    <div className="h-14 bg-white border-b border-border px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4 text-muted-foreground" />
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Processes</span>
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
          <span className="text-sm font-medium">{processName}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {isCollaborating && (
          <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-700">3 collaborators</span>
          </div>
        )}
        
        <Button variant="ghost" size="sm" onClick={onSave}>
          <Save className="w-4 h-4 mr-1" />
          Save
        </Button>
        
        <Button variant="ghost" size="sm" onClick={onShare}>
          <Share2 className="w-4 h-4 mr-1" />
          Share
        </Button>
        
        <Button variant="ghost" size="sm" onClick={onExport}>
          <Download className="w-4 h-4 mr-1" />
          Export
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Enhanced Element Palette
const ElementPalette = ({ 
  isCollapsed, 
  onToggle, 
  onDragStart 
}: { 
  isCollapsed: boolean; 
  onToggle: () => void; 
  onDragStart: (event: React.DragEvent, nodeType: string) => void; 
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    events: true,
    tasks: true,
    gateways: false,
    containers: false,
    data: false,
  });

  const elementCategories = {
    events: [
      { type: 'startEvent', icon: Play, label: 'Start Event', color: 'text-green-600' },
      { type: 'endEvent', icon: Square, label: 'End Event', color: 'text-red-600' },
      { type: 'intermediateEvent', icon: Circle, label: 'Intermediate Event', color: 'text-blue-600' },
    ],
    tasks: [
      { type: 'task', icon: FileText, label: 'Task', color: 'text-blue-600' },
      { type: 'userTask', icon: User, label: 'User Task', color: 'text-blue-600' },
      { type: 'serviceTask', icon: Zap, label: 'Service Task', color: 'text-blue-600' },
      { type: 'scriptTask', icon: Code, label: 'Script Task', color: 'text-blue-600' },
    ],
    gateways: [
      { type: 'exclusiveGateway', icon: Diamond, label: 'Exclusive Gateway', color: 'text-yellow-600' },
      { type: 'parallelGateway', icon: Diamond, label: 'Parallel Gateway', color: 'text-yellow-600' },
      { type: 'inclusiveGateway', icon: Diamond, label: 'Inclusive Gateway', color: 'text-yellow-600' },
    ],
    containers: [
      { type: 'subprocess', icon: Layers, label: 'Sub Process', color: 'text-purple-600' },
      { type: 'pool', icon: Square, label: 'Pool', color: 'text-purple-600' },
      { type: 'lane', icon: Square, label: 'Lane', color: 'text-purple-600' },
    ],
    data: [
      { type: 'dataObject', icon: Database, label: 'Data Object', color: 'text-gray-600' },
      { type: 'dataStore', icon: HardDrive, label: 'Data Store', color: 'text-gray-600' },
      { type: 'message', icon: Mail, label: 'Message', color: 'text-gray-600' },
    ],
  };

  if (isCollapsed) {
    return (
      <div className="absolute left-4 top-20 bg-white border border-border rounded-lg shadow-lg p-2 z-20">
        <Button variant="ghost" size="sm" onClick={onToggle}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute left-4 top-20 bg-white border border-border rounded-lg shadow-lg z-20 w-64 max-h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="text-sm font-semibold">BPMN Elements</h3>
        <Button variant="ghost" size="sm" onClick={onToggle}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-2 space-y-2">
          {Object.entries(elementCategories).map(([category, elements]) => (
            <Collapsible
              key={category}
              open={expandedCategories[category]}
              onOpenChange={(open) => setExpandedCategories(prev => ({ ...prev, [category]: open }))}
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between h-8 px-2 text-xs font-medium">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  {expandedCategories[category] ? 
                    <ChevronDown className="h-3 w-3" /> : 
                    <ChevronRight className="h-3 w-3" />
                  }
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1">
                {elements.map((element) => {
                  const IconComponent = element.icon;
                  return (
                    <div
                      key={element.type}
                      className="flex items-center gap-2 p-2 border border-border rounded cursor-grab hover:bg-accent transition-colors text-xs"
                      draggable
                      onDragStart={(event) => onDragStart(event, element.type)}
                    >
                      <IconComponent className={`w-4 h-4 ${element.color}`} />
                      <span>{element.label}</span>
                    </div>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

// Properties Panel
const PropertiesPanel = ({ 
  selectedNode, 
  onNodeUpdate,
  isVisible,
  onToggle 
}: { 
  selectedNode: Node | null; 
  onNodeUpdate: (nodeId: string, data: any) => void;
  isVisible: boolean;
  onToggle: () => void;
}) => {
  const [nodeData, setNodeData] = useState({
    label: '',
    description: '',
    assignee: '',
    priority: 'medium',
    documentation: '',
    type: 'user',
    gatewayType: 'exclusive'
  });

  useEffect(() => {
    if (selectedNode) {
      setNodeData({
        label: (selectedNode.data?.label as string) || '',
        description: (selectedNode.data?.description as string) || '',
        assignee: (selectedNode.data?.assignee as string) || '',
        priority: (selectedNode.data?.priority as string) || 'medium',
        documentation: (selectedNode.data?.documentation as string) || '',
        type: (selectedNode.data?.type as string) || 'user',
        gatewayType: (selectedNode.data?.gatewayType as string) || 'exclusive'
      });
    }
  }, [selectedNode]);

  const handleUpdate = (field: string, value: string) => {
    setNodeData(prev => ({ ...prev, [field]: value }));
    if (selectedNode) {
      onNodeUpdate(selectedNode.id, { ...nodeData, [field]: value });
    }
  };

  if (!isVisible) {
    return (
      <div className="absolute right-4 top-20 bg-white border border-border rounded-lg shadow-lg p-2 z-20">
        <Button variant="ghost" size="sm" onClick={onToggle}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute right-4 top-20 bg-white border border-border rounded-lg shadow-lg z-20 w-80 max-h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="text-sm font-semibold">Properties</h3>
        <Button variant="ghost" size="sm" onClick={onToggle}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-4 space-y-4">
          {selectedNode ? (
            <>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{selectedNode.type}</Badge>
                <span className="text-xs text-muted-foreground">ID: {selectedNode.id}</span>
              </div>
              
              <div>
                <Label htmlFor="label" className="text-xs font-medium">Name</Label>
                <Input
                  id="label"
                  value={nodeData.label}
                  onChange={(e) => handleUpdate('label', e.target.value)}
                  className="mt-1 h-8"
                  placeholder="Enter element name"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-xs font-medium">Description</Label>
                <Textarea
                  id="description"
                  value={nodeData.description}
                  onChange={(e) => handleUpdate('description', e.target.value)}
                  className="mt-1"
                  placeholder="Enter description"
                  rows={2}
                />
              </div>

              {selectedNode.type === 'task' && (
                <>
                  <div>
                    <Label htmlFor="type" className="text-xs font-medium">Task Type</Label>
                    <Select value={nodeData.type} onValueChange={(value) => handleUpdate('type', value)}>
                      <SelectTrigger className="mt-1 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User Task</SelectItem>
                        <SelectItem value="service">Service Task</SelectItem>
                        <SelectItem value="script">Script Task</SelectItem>
                        <SelectItem value="manual">Manual Task</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="assignee" className="text-xs font-medium">Assignee</Label>
                    <Input
                      id="assignee"
                      value={nodeData.assignee}
                      onChange={(e) => handleUpdate('assignee', e.target.value)}
                      className="mt-1 h-8"
                      placeholder="Assign to user"
                    />
                  </div>

                  <div>
                    <Label htmlFor="priority" className="text-xs font-medium">Priority</Label>
                    <Select value={nodeData.priority} onValueChange={(value) => handleUpdate('priority', value)}>
                      <SelectTrigger className="mt-1 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {selectedNode.type === 'gateway' && (
                <div>
                  <Label htmlFor="gatewayType" className="text-xs font-medium">Gateway Type</Label>
                  <Select value={nodeData.gatewayType} onValueChange={(value) => handleUpdate('gatewayType', value)}>
                    <SelectTrigger className="mt-1 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exclusive">Exclusive (XOR)</SelectItem>
                      <SelectItem value="parallel">Parallel (AND)</SelectItem>
                      <SelectItem value="inclusive">Inclusive (OR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="documentation" className="text-xs font-medium">Documentation</Label>
                <Textarea
                  id="documentation"
                  value={nodeData.documentation}
                  onChange={(e) => handleUpdate('documentation', e.target.value)}
                  className="mt-1"
                  placeholder="Add documentation"
                  rows={3}
                />
              </div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground text-center py-8">
              Select an element to view its properties
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

// Main Process Manager Component
export const SignavioProcessManager = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [paletteCollapsed, setPaletteCollapsed] = useState(false);
  const [propertiesVisible, setPropertiesVisible] = useState(true);
  const { toast } = useToast();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges]
  );

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowBounds) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left - 50,
        y: event.clientY - reactFlowBounds.top - 50,
      };

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: type === 'exclusiveGateway' || type === 'parallelGateway' || type === 'inclusiveGateway' ? 'gateway' : type,
        position,
        data: { 
          label: `New ${type}`,
          ...(type.includes('Gateway') && { gatewayType: type.replace('Gateway', '') }),
          ...(type.includes('Task') && { type: type.replace('Task', '') })
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

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onNodeUpdate = useCallback((nodeId: string, data: any) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node))
    );
  }, [setNodes]);

  const handleSave = () => {
    toast({
      title: "Process Saved",
      description: "Your process has been saved successfully.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Process Exported",
      description: "Your process has been exported as BPMN XML.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Process Shared",
      description: "Sharing link has been copied to clipboard.",
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <SignavioHeader
        processName="Order Processing Workflow"
        onSave={handleSave}
        onExport={handleExport}
        onShare={handleShare}
        isCollaborating={true}
      />
      
      <div className="flex-1 relative">
        <div ref={reactFlowWrapper} className="w-full h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-white"
          >
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1} 
              color="#e2e8f0"
            />
            <MiniMap 
              className="!bg-white !border-border"
              nodeColor={(node) => {
                switch (node.type) {
                  case 'startEvent': return '#22c55e';
                  case 'endEvent': return '#ef4444';
                  case 'task': return '#3b82f6';
                  case 'gateway': return '#eab308';
                  case 'subprocess': return '#8b5cf6';
                  default: return '#64748b';
                }
              }}
            />
            <Controls className="!bg-white !border-border !shadow-lg" />
            
            <Panel position="bottom-left" className="m-4">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>Start Events: {nodes.filter(n => n.type === 'startEvent').length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>Tasks: {nodes.filter(n => n.type === 'task').length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span>Gateways: {nodes.filter(n => n.type === 'gateway').length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span>End Events: {nodes.filter(n => n.type === 'endEvent').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Panel>
          </ReactFlow>
        </div>

        <ElementPalette
          isCollapsed={paletteCollapsed}
          onToggle={() => setPaletteCollapsed(!paletteCollapsed)}
          onDragStart={onDragStart}
        />

        <PropertiesPanel
          selectedNode={selectedNode}
          onNodeUpdate={onNodeUpdate}
          isVisible={propertiesVisible}
          onToggle={() => setPropertiesVisible(!propertiesVisible)}
        />
      </div>
    </div>
  );
};