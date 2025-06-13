
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

interface VoiceContextType {
  isVoiceEnabled: boolean;
  toggleVoice: () => void;
  speakText: (text: string) => void;
  isSupported: boolean;
  isSpeaking: boolean;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

interface VoiceProviderProps {
  children: ReactNode;
}

export const VoiceProvider: React.FC<VoiceProviderProps> = ({ children }) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('voiceEnabled') === 'true';
    }
    return false;
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      
      // Preload voices
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        console.log('Available voices:', voices.length);
      };
      
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', loadVoices);
      } else {
        loadVoices();
      }
      
      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, []);

  const speakText = useCallback((text: string) => {
    if (!isVoiceEnabled || !isSupported || !text.trim()) {
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && (voice.name.includes('Female') || voice.name.includes('Samantha'))
    ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesis.speak(utterance);
  }, [isVoiceEnabled, isSupported]);

  const toggleVoice = useCallback(() => {
    const newState = !isVoiceEnabled;
    setIsVoiceEnabled(newState);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('voiceEnabled', newState.toString());
    }
    
    if (newState) {
      speakText("Voice enabled. You will now receive audio feedback.");
    } else {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isVoiceEnabled, speakText]);

  const value: VoiceContextType = {
    isVoiceEnabled,
    toggleVoice,
    speakText,
    isSupported,
    isSpeaking
  };

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = (): VoiceContextType => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error("useVoice must be used within a VoiceProvider");
  }
  return context;
};
