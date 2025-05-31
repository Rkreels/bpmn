import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useVoice } from "./VoiceContext";
import { useLocation } from "react-router-dom";

interface VoiceTrainerContextType {
  isTrainerEnabled: boolean;
  toggleTrainer: () => void;
  currentTutorial: string | null;
  startTutorial: (tutorialId: string) => void;
  endTutorial: () => void;
  nextStep: () => void;
  previousStep: () => void;
  isPaused: boolean;
  togglePause: () => void;
}

const VoiceTrainerContext = createContext<VoiceTrainerContextType | undefined>(undefined);

export const useVoiceTrainer = () => {
  const context = useContext(VoiceTrainerContext);
  if (!context) {
    throw new Error("useVoiceTrainer must be used within a VoiceTrainerProvider");
  }
  return context;
};

// Define tutorial step type
interface TutorialStep {
  id: string;
  text: string;
  elementSelector?: string; // CSS selector for highlighting
  action?: string; // Action hint
}

// Define tutorial type
interface Tutorial {
  id: string;
  name: string;
  description: string;
  steps: TutorialStep[];
  pageUrl?: string; // URL to ensure tutorial only runs on correct page
}

// Define tutorials for different modules
const tutorials: Tutorial[] = [
  {
    id: "process-mining-intro",
    name: "Process Mining Introduction",
    description: "Learn how to analyze and optimize business processes using event data",
    pageUrl: "/process-mining",
    steps: [
      {
        id: "welcome",
        text: "Welcome to Process Mining! This powerful module helps you discover, analyze, and optimize your business processes using real data from your systems. You can upload event logs, discover actual process flows, identify bottlenecks, and get optimization recommendations.",
        elementSelector: ".process-mining-dashboard"
      },
      {
        id: "actions",
        text: "These action buttons let you create new mining projects, upload event data files, start comprehensive analysis, and export results. The upload supports CSV, XES, and JSON formats up to 50MB.",
        elementSelector: ".process-mining-actions"
      },
      {
        id: "stats",
        text: "These interactive statistics show your process mining progress: processes analyzed, event logs processed, bottlenecks identified, and total process cases. Click on any statistic to navigate to the relevant section.",
        elementSelector: ".mining-stats"
      },
      {
        id: "tabs",
        text: "Navigate between different analysis views: Overview for dashboard and statistics, Explorer for process variants and case analysis, Performance for bottleneck identification, Conformance for compliance checking, Optimization for improvement recommendations, and Event Logs for data management.",
        elementSelector: ".tabs-navigation"
      },
      {
        id: "explorer",
        text: "The Process Explorer shows your actual process flows discovered from event logs. You can view different process variants, their frequencies, analyze individual cases, and identify bottlenecks with recommendations for optimization.",
        elementSelector: ".process-explorer"
      },
      {
        id: "conformance",
        text: "Conformance checking compares your actual process execution against reference models to identify deviations, compliance issues, and process variations that may need attention.",
        elementSelector: ".conformance-checker"
      }
    ]
  },
  {
    id: "transformation-cockpit-intro",
    name: "Transformation Cockpit Introduction", 
    description: "Learn how to manage digital transformation initiatives",
    pageUrl: "/transformation-cockpit",
    steps: [
      {
        id: "welcome",
        text: "Welcome to the Transformation Cockpit! This is your central command center for managing digital transformation initiatives. Track portfolio value, monitor progress, and ensure successful delivery.",
        elementSelector: ".transformation-dashboard"
      },
      {
        id: "metrics",
        text: "These key metrics show your transformation portfolio performance: total value, active initiatives, value delivered year-to-date, and transformation ROI.",
        elementSelector: ".metrics-grid"
      },
      {
        id: "actions",
        text: "Use these action buttons to create new initiatives, generate reports, configure settings, and manage your transformation portfolio.",
        elementSelector: ".transformation-actions"
      },
      {
        id: "initiatives",
        text: "This section displays your recent transformation initiatives with their status, progress, budget, and timeline information.",
        elementSelector: ".initiatives-section"
      },
      {
        id: "tabs",
        text: "Navigate between different views: Portfolio overview for initiative management, Value realization for ROI tracking, Change management for organizational adoption, Risk management for mitigation strategies, and Resource planning for allocation optimization.",
        elementSelector: ".tabs-navigation"
      },
      {
        id: "portfolio",
        text: "The Portfolio tab allows you to filter, view, edit, and create transformation initiatives. You can also export data and track progress across all programs.",
        elementSelector: ".portfolio-overview"
      }
    ]
  },
  {
    id: "process-manager-intro",
    name: "Process Manager Introduction",
    description: "Learn how to use the Process Manager to create BPMN diagrams",
    pageUrl: "/process-manager",
    steps: [
      {
        id: "welcome",
        text: "Welcome to the Process Manager! This tool helps you design and manage business process models using the BPMN standard."
      },
      {
        id: "editor-tabs",
        text: "The editor has four main tabs: Editor for designing your process, Preview for viewing the rendered model, XML for editing the raw BPMN code, and Simulation for testing your process."
      },
      {
        id: "element-palette",
        text: "Use the element palette on the left to add new elements to your process. Simply click an element type and then click on the canvas to place it."
      },
      {
        id: "tools",
        text: "The tools at the top help you select, move, connect, and manipulate process elements."
      },
      {
        id: "properties",
        text: "Click on any element to view and edit its properties, such as name, description, and other attributes."
      },
      {
        id: "export",
        text: "Once your model is complete, you can save it, export it as XML or JSON, or share it with others."
      }
    ]
  },
  {
    id: "process-intelligence-intro",
    name: "Process Intelligence Introduction",
    description: "Learn how to analyze process performance with Process Intelligence",
    pageUrl: "/process-intelligence",
    steps: [
      {
        id: "welcome",
        text: "Welcome to Process Intelligence! This module helps you analyze, monitor, and optimize your business processes based on real data."
      },
      {
        id: "performance-analysis",
        text: "The Performance Analysis section shows you key metrics like cycle time, automation rate, and bottlenecks in your processes."
      },
      {
        id: "event-logs",
        text: "Upload your event logs to analyze real process execution data. Supported formats include CSV, XES, and XLSX."
      },
      {
        id: "process-discovery",
        text: "Process Discovery automatically creates process models from your event logs, showing you how processes are actually executed."
      },
      {
        id: "root-cause",
        text: "The Root Cause Analysis helps you identify factors contributing to process bottlenecks and inefficiencies."
      },
      {
        id: "conformance",
        text: "Conformance Checking compares actual process execution against reference models to find deviations and compliance issues."
      }
    ]
  }
];

interface VoiceTrainerProviderProps {
  children: React.ReactNode;
}

export const VoiceTrainerProvider: React.FC<VoiceTrainerProviderProps> = ({ children }) => {
  const { speakText, isVoiceEnabled, toggleVoice, cancelSpeech } = useVoice();
  const location = useLocation();
  const [isTrainerEnabled, setIsTrainerEnabled] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speechSynthesisVoices, setSpeechSynthesisVoices] = useState<SpeechSynthesisVoice[]>([]);
  const preferredVoice = useRef<SpeechSynthesisVoice | null>(null);
  
  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setSpeechSynthesisVoices(voices);
        
        // Find a female English voice
        const femaleVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('female') && 
          voice.lang.startsWith('en')
        );
        
        const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
        
        preferredVoice.current = femaleVoice || englishVoice || voices[0];
        console.log("Selected voice:", preferredVoice.current.name);
      }
    };
    
    // Load voices immediately if available
    loadVoices();
    
    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  // Try to load trainer state from localStorage
  useEffect(() => {
    const savedTrainerPreference = localStorage.getItem("voice-trainer-enabled");
    if (savedTrainerPreference) {
      setIsTrainerEnabled(savedTrainerPreference === "true");
    }
    
    // Enable voice if trainer is enabled
    if (savedTrainerPreference === "true" && !isVoiceEnabled) {
      toggleVoice();
    }
  }, [isVoiceEnabled, toggleVoice]);
  
  // Save trainer state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("voice-trainer-enabled", String(isTrainerEnabled));
  }, [isTrainerEnabled]);

  // Get current tutorial steps
  const getCurrentTutorialSteps = () => {
    if (!currentTutorial) return [];
    const tutorial = tutorials.find(t => t.id === currentTutorial);
    return tutorial ? tutorial.steps : [];
  };

  // Get current step
  const getCurrentStep = () => {
    const steps = getCurrentTutorialSteps();
    return steps[currentStepIndex] || null;
  };

  // Speak a step with enhanced explanations
  const speakStep = (step: TutorialStep | null) => {
    if (!step || isPaused) return;
    
    // Enhanced text with more detailed explanations
    let enhancedText = step.text;
    
    // Add contextual information based on step ID
    if (step.id === "metrics") {
      enhancedText += " These metrics are updated in real-time and provide insights into your transformation progress and financial impact.";
    } else if (step.id === "portfolio") {
      enhancedText += " You can filter initiatives by status, priority, or category. Click on any initiative to view detailed information or make edits.";
    } else if (step.id === "bottlenecks") {
      enhancedText += " Each bottleneck shows the average wait time, impact score, frequency, and potential monthly savings from optimization.";
    }
    
    if (window.speechSynthesis && preferredVoice.current) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create a new speech utterance
      const utterance = new SpeechSynthesisUtterance(enhancedText);
      
      // Set the preferred voice
      utterance.voice = preferredVoice.current;
      utterance.rate = 0.9; // Slightly slower for better comprehension
      utterance.pitch = 1.1;
      utterance.volume = 1.0;
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      // Fall back to the regular voice function
      speakText(enhancedText);
    }
  };

  // Effect to handle URL changes and start appropriate tutorials
  useEffect(() => {
    if (!isTrainerEnabled || currentTutorial || isPaused) return;
    
    const currentPath = location.pathname;
    const matchingTutorial = tutorials.find(tutorial => 
      tutorial.pageUrl === currentPath
    );
    
    if (matchingTutorial) {
      // Small delay to let the page render first
      setTimeout(() => {
        startTutorial(matchingTutorial.id);
      }, 1500);
    }
  }, [location.pathname, isTrainerEnabled, currentTutorial, isPaused]);

  // Effect to speak the current step
  useEffect(() => {
    const currentStep = getCurrentStep();
    if (currentStep && currentTutorial && isTrainerEnabled && !isPaused) {
      speakStep(currentStep);
      
      // Highlight the relevant element if specified
      if (currentStep.elementSelector) {
        const element = document.querySelector(currentStep.elementSelector);
        if (element) {
          // Add highlight class or styles
          element.classList.add("voice-trainer-highlight");
          
          // Remove highlight when moving to another step
          return () => {
            element.classList.remove("voice-trainer-highlight");
          };
        }
      }
    }
  }, [currentStepIndex, currentTutorial, isTrainerEnabled, isPaused]);

  const toggleTrainer = () => {
    const newState = !isTrainerEnabled;
    setIsTrainerEnabled(newState);
    
    if (newState) {
      // Make sure voice is enabled when trainer is enabled
      if (!isVoiceEnabled) {
        toggleVoice();
      }
      
      speakText("Voice trainer enabled. I'll guide you through using this application.");
    } else {
      // Cancel any ongoing tutorial
      endTutorial();
      speakText("Voice trainer disabled.");
    }
  };

  const startTutorial = (tutorialId: string) => {
    const tutorial = tutorials.find(t => t.id === tutorialId);
    if (tutorial) {
      setCurrentTutorial(tutorialId);
      setCurrentStepIndex(0);
      setIsPaused(false);
      
      speakText(`Starting tutorial: ${tutorial.name}. ${tutorial.description}`);
      
      // Wait a moment before starting the first step
      setTimeout(() => {
        const firstStep = tutorial.steps[0];
        if (firstStep) {
          speakStep(firstStep);
        }
      }, 2000);
    }
  };

  const endTutorial = () => {
    // Cancel any speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    } else {
      cancelSpeech();
    }
    
    setCurrentTutorial(null);
    setCurrentStepIndex(0);
  };

  const nextStep = () => {
    const steps = getCurrentTutorialSteps();
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prevIndex => prevIndex + 1);
    } else {
      // End tutorial when reaching the last step
      speakText("Tutorial complete. You can now explore on your own.");
      endTutorial();
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prevIndex => prevIndex - 1);
    }
  };

  const togglePause = () => {
    setIsPaused(prevState => !prevState);
    
    if (!isPaused) {
      // Pausing
      if (window.speechSynthesis) {
        window.speechSynthesis.pause();
      } else {
        cancelSpeech();
      }
      speakText("Tutorial paused. Click resume to continue.");
    } else {
      // Resuming
      if (window.speechSynthesis) {
        window.speechSynthesis.resume();
      } else {
        const currentStep = getCurrentStep();
        if (currentStep) {
          speakStep(currentStep);
        }
      }
      speakText("Tutorial resumed.");
    }
  };

  return (
    <VoiceTrainerContext.Provider
      value={{
        isTrainerEnabled,
        toggleTrainer,
        currentTutorial,
        startTutorial,
        endTutorial,
        nextStep,
        previousStep,
        isPaused,
        togglePause
      }}
    >
      {children}
      {isTrainerEnabled && currentTutorial && (
        <TutorialControls 
          tutorial={tutorials.find(t => t.id === currentTutorial)} 
          currentStep={getCurrentStep()} 
          totalSteps={getCurrentTutorialSteps().length}
          currentStepIndex={currentStepIndex}
          isPaused={isPaused}
          onNext={nextStep}
          onPrevious={previousStep}
          onClose={endTutorial}
          onTogglePause={togglePause}
        />
      )}
    </VoiceTrainerContext.Provider>
  );
};

// Tutorial controls component that shows at the bottom of the screen
interface TutorialControlsProps {
  tutorial: Tutorial | undefined;
  currentStep: TutorialStep | null;
  totalSteps: number;
  currentStepIndex: number;
  isPaused: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onTogglePause: () => void;
}

const TutorialControls: React.FC<TutorialControlsProps> = ({
  tutorial,
  currentStep,
  totalSteps,
  currentStepIndex,
  isPaused,
  onNext,
  onPrevious,
  onClose,
  onTogglePause
}) => {
  if (!tutorial || !currentStep) return null;
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border rounded-lg shadow-lg p-4 w-[90%] max-w-[600px] z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{tutorial.name}</h3>
        <span className="text-sm text-muted-foreground">Step {currentStepIndex + 1} of {totalSteps}</span>
      </div>
      
      <p className="text-sm mb-4">{currentStep.text}</p>
      
      {currentStep.action && (
        <div className="bg-muted/20 text-sm p-2 rounded mb-4">
          <span className="font-medium">Try it:</span> {currentStep.action}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <button 
          className="text-sm text-muted-foreground hover:text-primary"
          onClick={onClose}
        >
          Close Tutorial
        </button>
        
        <div className="flex items-center gap-2">
          <button 
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={onPrevious}
            disabled={currentStepIndex === 0}
          >
            Previous
          </button>
          
          <button 
            className="px-3 py-1 border rounded text-sm"
            onClick={onTogglePause}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
          
          <button 
            className="px-3 py-1 bg-primary text-white rounded text-sm"
            onClick={onNext}
          >
            {currentStepIndex === totalSteps - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};
