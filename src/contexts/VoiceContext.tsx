
import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserVoiceSynthesisService } from "../components/voice/VoiceSynthesisService";

// Define voice rule types
export type VoiceRule = {
  insight: string;
  action: string;
};

export type VoiceRules = {
  [key: string]: VoiceRule;
};

// Define the voice rules for all modules
export const voiceRules: VoiceRules = {
  dashboard: {
    insight: "Monitor real-time process KPIs",
    action: "Review the compliance alerts in the left panel"
  },
  processManager: {
    insight: "Optimize workflows with drag-and-drop modeling",
    action: "Open the template library to reuse industry-standard processes"
  },
  journeyModeler: {
    insight: "Map customer experiences across touchpoints",
    action: "Start by defining your customer personas and journey stages"
  },
  collaborationHub: {
    insight: "Foster team alignment on process improvements",
    action: "Invite stakeholders to review the latest process models"
  },
  repository: {
    insight: "Access centralized process documentation",
    action: "Use the search feature to find relevant templates"
  },
  processIntelligence: {
    insight: "Analyze process bottlenecks and inefficiencies",
    action: "Start by uploading your workflow data or connecting to SAP ERP"
  },
  processMining: {
    insight: "Discover actual process flows from event logs",
    action: "Upload your event logs or connect to your data source to begin analysis"
  },
  transformationCockpit: {
    insight: "Track ROI of digital transformation initiatives",
    action: "Sync with your Jira instance to map IT tickets"
  },
  reports: {
    insight: "Generate insights from process performance data",
    action: "Export the compliance report for your next governance meeting"
  },
  users: {
    insight: "Manage user access and permissions",
    action: "Adjust role assignments for new team members"
  },
  settings: {
    insight: "Configure application preferences",
    action: "Set up integration options with external systems"
  }
};

// Voice context type
type VoiceContextType = {
  isVoiceEnabled: boolean;
  toggleVoice: () => void;
  speakText: (text: string) => void;
  speakModuleNavigation: (moduleId: string) => void;
  speakModuleTooltip: (moduleId: string) => void;
  cancelSpeech: () => void;
};

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error("useVoice must be used within a VoiceProvider");
  }
  return context;
};

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(false);
  const [voiceService, setVoiceService] = useState<BrowserVoiceSynthesisService | null>(null);
  const [isSpeechSynthesisSupported, setIsSpeechSynthesisSupported] = useState<boolean>(true);
  
  // Initialize speech synthesis on component mount
  useEffect(() => {
    // Check if the browser supports speech synthesis
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const service = new BrowserVoiceSynthesisService({
        pitch: 1.1,
        rate: 0.95,
        preferFemaleVoice: true
      });
      
      setVoiceService(service);
      console.log("Speech synthesis initialized");
      
      // Try to load voice preference from localStorage
      const savedVoicePreference = localStorage.getItem("voice-enabled");
      if (savedVoicePreference) {
        setIsVoiceEnabled(savedVoicePreference === "true");
        console.log("Voice enabled:", savedVoicePreference === "true");
      }
    } else {
      console.error("Speech synthesis not supported in this browser");
      setIsSpeechSynthesisSupported(false);
    }
    
    return () => {
      // Cancel any ongoing speech when the component unmounts
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Save voice preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("voice-enabled", String(isVoiceEnabled));
  }, [isVoiceEnabled]);

  const toggleVoice = () => {
    const newState = !isVoiceEnabled;
    setIsVoiceEnabled(newState);
    console.log("Voice toggled to:", newState);
    
    // Provide feedback when voice is enabled
    if (newState && voiceService) {
      voiceService.speak("Voice navigation enabled");
    }
  };

  const cancelSpeech = () => {
    if (voiceService) {
      voiceService.stop();
    } else if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speakText = (text: string) => {
    if (!isVoiceEnabled || !voiceService) {
      console.log("Speech not enabled or synthesis unavailable");
      return;
    }
    
    console.log("Speaking text:", text);
    
    // Cancel any ongoing speech
    cancelSpeech();
    
    // Speak the text using our enhanced voice service
    voiceService.speak(text);
  };

  const speakModuleNavigation = (moduleId: string) => {
    const module = moduleId.replace("sidebar-", "");
    const rule = voiceRules[module];
    
    if (rule) {
      const text = `Navigating to ${module.replace(/([A-Z])/g, ' $1').trim()}. Strategic focus: ${rule.insight}. Suggested next steps: ${rule.action}.`;
      console.log("Navigation voice command:", text);
      speakText(text);
    } else {
      console.warn(`No voice rule found for module: ${module}`);
    }
  };

  const speakModuleTooltip = (moduleId: string) => {
    const module = moduleId.replace("sidebar-", "");
    const rule = voiceRules[module];
    
    if (rule) {
      const text = rule.insight;
      console.log("Tooltip voice command:", text);
      speakText(text);
    } else {
      console.warn(`No voice rule found for module: ${module}`);
    }
  };

  return (
    <VoiceContext.Provider 
      value={{
        isVoiceEnabled,
        toggleVoice,
        speakText,
        speakModuleNavigation,
        speakModuleTooltip,
        cancelSpeech
      }}
    >
      {children}
      {!isSpeechSynthesisSupported && isVoiceEnabled && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded shadow-lg">
          <p className="text-sm">Speech synthesis is not supported in your browser. Voice navigation is disabled.</p>
        </div>
      )}
    </VoiceContext.Provider>
  );
};
