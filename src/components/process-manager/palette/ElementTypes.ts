
import { Square, Diamond, Circle, Layers, Database, Layout, ArrowRight } from "lucide-react";

export const elementTypes = [
  { 
    id: "task", 
    name: "Task", 
    icon: Square, 
    description: "Add a task or activity",
    voiceGuidance: "Task represents an activity performed in a process. Use it for steps that require action."
  },
  { 
    id: "gateway", 
    name: "Gateway", 
    icon: Diamond, 
    description: "Add a decision gateway",
    voiceGuidance: "Gateway represents a decision point where the process flow diverges based on conditions."
  },
  { 
    id: "start-event", 
    name: "Start", 
    icon: Circle, 
    description: "Add a start event",
    voiceGuidance: "Start event indicates where a process begins. Every process model should have at least one start event."
  },
  { 
    id: "end-event", 
    name: "End", 
    icon: Circle, 
    description: "Add an end event",
    voiceGuidance: "End event indicates where a process path ends. A process can have multiple end events."
  },
  { 
    id: "subprocess", 
    name: "Subprocess", 
    icon: Layers, 
    description: "Add a subprocess container",
    voiceGuidance: "Subprocess allows you to encapsulate a portion of your process that can be collapsed or expanded."
  },
  { 
    id: "dataobject", 
    name: "Data Object", 
    icon: Database, 
    description: "Add a data object",
    voiceGuidance: "Data object represents information flowing through the process, such as documents or data records."
  },
  { 
    id: "pool", 
    name: "Pool/Lane", 
    icon: Layout, 
    description: "Add a pool or lane",
    voiceGuidance: "Pools and lanes represent participants or organizational units responsible for activities in the process."
  }
];

export const connectorTypes = [
  {
    id: "sequence-flow",
    name: "Sequence Flow",
    icon: ArrowRight,
    description: "Connect elements with sequence flow",
    voiceGuidance: "Sequence flow shows the order in which activities are performed in a process."
  },
  {
    id: "message-flow",
    name: "Message Flow",
    icon: ArrowRight,
    iconClass: "rotate-90",
    description: "Connect elements with message flow",
    voiceGuidance: "Message flow represents communication between different participants in a process, typically across pool boundaries."
  }
];
