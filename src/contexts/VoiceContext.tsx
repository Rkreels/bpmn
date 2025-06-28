
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VoiceContextType {
  isVoiceEnabled: boolean;
  speakText: (text: string) => void;
  toggleVoice: () => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider = ({ children }: { children: ReactNode }) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  const speakText = (text: string) => {
    if (isVoiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  return (
    <VoiceContext.Provider value={{ isVoiceEnabled, speakText, toggleVoice }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};
