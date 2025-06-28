
import React, { createContext, useContext, useState, useCallback } from 'react';

interface VoiceContextType {
  isVoiceEnabled: boolean;
  setIsVoiceEnabled: (enabled: boolean) => void;
  toggleVoice: () => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSupported: boolean;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isSupported] = useState(typeof window !== 'undefined' && 'speechSynthesis' in window);

  const toggleVoice = useCallback(() => {
    setIsVoiceEnabled(prev => !prev);
  }, []);

  const speakText = useCallback((text: string) => {
    if (!isVoiceEnabled || !isSupported || !text) return;
    
    try {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn('Speech synthesis failed:', error);
    }
  }, [isVoiceEnabled, isSupported]);

  const stopSpeaking = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
    }
  }, [isSupported]);

  return (
    <VoiceContext.Provider 
      value={{
        isVoiceEnabled,
        setIsVoiceEnabled,
        toggleVoice,
        speakText,
        stopSpeaking,
        isSupported
      }}
    >
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
