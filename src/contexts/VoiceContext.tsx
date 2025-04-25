
import React, { createContext, useContext, useState, useEffect } from "react";

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
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  
  // Initialize speech synthesis on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSpeechSynthesis(window.speechSynthesis);
      
      // Try to load voice preference from localStorage
      const savedVoicePreference = localStorage.getItem("voice-enabled");
      if (savedVoicePreference) {
        setIsVoiceEnabled(savedVoicePreference === "true");
      }
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
    setIsVoiceEnabled(prev => !prev);
  };

  const cancelSpeech = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
  };

  const speakText = (text: string) => {
    if (!isVoiceEnabled || !speechSynthesis) return;
    
    // Cancel any ongoing speech
    cancelSpeech();
    
    // Create a new speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Speak the text
    speechSynthesis.speak(utterance);
  };

  const speakModuleNavigation = (moduleId: string) => {
    const module = moduleId.replace("sidebar-", "");
    const rule = voiceRules[module];
    
    if (rule) {
      const text = `Navigating to ${module.replace(/([A-Z])/g, ' $1').trim()}. Strategic focus: ${rule.insight}. Suggested next steps: ${rule.action}.`;
      speakText(text);
    }
  };

  const speakModuleTooltip = (moduleId: string) => {
    const module = moduleId.replace("sidebar-", "");
    const rule = voiceRules[module];
    
    if (rule) {
      const text = rule.insight;
      speakText(text);
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
    </VoiceContext.Provider>
  );
};
