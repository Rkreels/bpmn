
import { 
  Square, 
  Diamond, 
  Circle, 
  Layers, 
  Database, 
  Layout, 
  ArrowRight,
  User,
  Cog,
  Mail,
  Clock,
  FileText,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Timer,
  Calendar,
  MessageSquare,
  Send,
  Phone,
  Monitor,
  GitBranch,
  Repeat,
  Archive
} from "lucide-react";

export const elementTypes = [
  // Events
  { 
    id: "start-event", 
    name: "Start Event", 
    icon: Circle, 
    category: "Events",
    description: "Process start point",
    voiceGuidance: "Start event indicates where a process begins. Every process model should have at least one start event.",
    color: "#10b981"
  },
  { 
    id: "end-event", 
    name: "End Event", 
    icon: XCircle, 
    category: "Events",
    description: "Process end point",
    voiceGuidance: "End event indicates where a process path ends. A process can have multiple end events.",
    color: "#ef4444"
  },
  { 
    id: "intermediate-event", 
    name: "Intermediate Event", 
    icon: Clock, 
    category: "Events",
    description: "Event that occurs during process execution",
    voiceGuidance: "Intermediate events occur during process execution and can catch or throw events.",
    color: "#f59e0b"
  },
  { 
    id: "message-start", 
    name: "Message Start", 
    icon: Mail, 
    category: "Events",
    description: "Process starts when message is received",
    voiceGuidance: "Message start event begins the process when a specific message is received.",
    color: "#8b5cf6"
  },
  { 
    id: "timer-start", 
    name: "Timer Start", 
    icon: Timer, 
    category: "Events",
    description: "Process starts at scheduled time",
    voiceGuidance: "Timer start event begins the process at a specific time or interval.",
    color: "#06b6d4"
  },

  // Tasks
  { 
    id: "task", 
    name: "Task", 
    icon: Square, 
    category: "Tasks",
    description: "Generic work activity",
    voiceGuidance: "Task represents a generic activity performed in a process. Use it for steps that require action.",
    color: "#3b82f6"
  },
  { 
    id: "user-task", 
    name: "User Task", 
    icon: User, 
    category: "Tasks",
    description: "Task performed by human user",
    voiceGuidance: "User task requires human interaction to complete the activity.",
    color: "#8b5cf6"
  },
  { 
    id: "service-task", 
    name: "Service Task", 
    icon: Cog, 
    category: "Tasks",
    description: "Automated system task",
    voiceGuidance: "Service task is executed automatically by a system or service.",
    color: "#10b981"
  },
  { 
    id: "manual-task", 
    name: "Manual Task", 
    icon: FileText, 
    category: "Tasks",
    description: "Manual work not tracked by system",
    voiceGuidance: "Manual task represents work done outside the system's control.",
    color: "#f59e0b"
  },
  { 
    id: "script-task", 
    name: "Script Task", 
    icon: Monitor, 
    category: "Tasks",
    description: "Automated script execution",
    voiceGuidance: "Script task executes code or scripts automatically.",
    color: "#6b7280"
  },
  { 
    id: "send-task", 
    name: "Send Task", 
    icon: Send, 
    category: "Tasks",
    description: "Send message to external participant",
    voiceGuidance: "Send task sends messages to external participants or systems.",
    color: "#14b8a6"
  },
  { 
    id: "receive-task", 
    name: "Receive Task", 
    icon: MessageSquare, 
    category: "Tasks",
    description: "Wait for incoming message",
    voiceGuidance: "Receive task waits for messages from external participants.",
    color: "#06b6d4"
  },
  { 
    id: "business-rule-task", 
    name: "Business Rule", 
    icon: GitBranch, 
    category: "Tasks",
    description: "Execute business rules",
    voiceGuidance: "Business rule task executes business logic and decision rules.",
    color: "#84cc16"
  },

  // Gateways
  { 
    id: "exclusive-gateway", 
    name: "Exclusive Gateway", 
    icon: Diamond, 
    category: "Gateways",
    description: "Either/or decision point",
    voiceGuidance: "Exclusive gateway represents a decision where only one path can be taken.",
    color: "#f59e0b"
  },
  { 
    id: "parallel-gateway", 
    name: "Parallel Gateway", 
    icon: Diamond, 
    category: "Gateways",
    description: "Split/join parallel paths",
    voiceGuidance: "Parallel gateway splits the process into parallel paths or joins them back together.",
    color: "#10b981"
  },
  { 
    id: "inclusive-gateway", 
    name: "Inclusive Gateway", 
    icon: Diamond, 
    category: "Gateways",
    description: "One or more paths decision",
    voiceGuidance: "Inclusive gateway allows one or more paths to be taken based on conditions.",
    color: "#8b5cf6"
  },
  { 
    id: "event-gateway", 
    name: "Event Gateway", 
    icon: Diamond, 
    category: "Gateways",
    description: "Event-based decision",
    voiceGuidance: "Event gateway makes decisions based on events that occur.",
    color: "#06b6d4"
  },

  // Subprocesses and Containers
  { 
    id: "subprocess", 
    name: "Subprocess", 
    icon: Layers, 
    category: "Containers",
    description: "Embedded subprocess",
    voiceGuidance: "Subprocess allows you to encapsulate a portion of your process that can be collapsed or expanded.",
    color: "#6b7280"
  },
  { 
    id: "call-activity", 
    name: "Call Activity", 
    icon: Repeat, 
    category: "Containers",
    description: "Reference to external process",
    voiceGuidance: "Call activity references and executes an external process or subprocess.",
    color: "#f97316"
  },
  { 
    id: "event-subprocess", 
    name: "Event Subprocess", 
    icon: Zap, 
    category: "Containers",
    description: "Event-triggered subprocess",
    voiceGuidance: "Event subprocess is triggered by events during the main process execution.",
    color: "#ef4444"
  },

  // Data Objects
  { 
    id: "data-object", 
    name: "Data Object", 
    icon: Database, 
    category: "Data",
    description: "Information or document",
    voiceGuidance: "Data object represents information flowing through the process, such as documents or data records.",
    color: "#64748b"
  },
  { 
    id: "data-store", 
    name: "Data Store", 
    icon: Archive, 
    category: "Data",
    description: "Persistent data storage",
    voiceGuidance: "Data store represents persistent storage that can be accessed throughout the process.",
    color: "#475569"
  },

  // Pools and Lanes
  { 
    id: "pool", 
    name: "Pool", 
    icon: Layout, 
    category: "Participants",
    description: "Process participant container",
    voiceGuidance: "Pool represents a participant or organization in the process.",
    color: "#1e293b"
  },
  { 
    id: "lane", 
    name: "Lane", 
    icon: Layout, 
    category: "Participants",
    description: "Responsibility subdivision",
    voiceGuidance: "Lane subdivides a pool to organize activities by role or responsibility.",
    color: "#334155"
  }
];

export const connectorTypes = [
  {
    id: "sequence-flow",
    name: "Sequence Flow",
    icon: ArrowRight,
    description: "Normal process flow",
    voiceGuidance: "Sequence flow shows the order in which activities are performed in a process.",
    color: "#374151"
  },
  {
    id: "message-flow",
    name: "Message Flow",
    icon: Mail,
    description: "Cross-pool communication",
    voiceGuidance: "Message flow represents communication between different participants in a process, typically across pool boundaries.",
    color: "#3b82f6"
  },
  {
    id: "association",
    name: "Association",
    icon: ArrowRight,
    iconClass: "opacity-50",
    description: "Link to artifacts",
    voiceGuidance: "Association connects activities with artifacts like text annotations or data objects.",
    color: "#6b7280"
  },
  {
    id: "data-association",
    name: "Data Association",
    icon: Database,
    description: "Data flow connection",
    voiceGuidance: "Data association shows how data flows between activities and data objects.",
    color: "#059669"
  }
];

// Group elements by category for better organization
export const elementCategories = {
  "Events": elementTypes.filter(el => el.category === "Events"),
  "Tasks": elementTypes.filter(el => el.category === "Tasks"),
  "Gateways": elementTypes.filter(el => el.category === "Gateways"),
  "Containers": elementTypes.filter(el => el.category === "Containers"),
  "Data": elementTypes.filter(el => el.category === "Data"),
  "Participants": elementTypes.filter(el => el.category === "Participants")
};
