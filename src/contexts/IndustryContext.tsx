import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Industry = 'manufacturing' | 'healthcare' | 'construction' | 'financial' | 'retail';

export interface IndustryConfig {
  id: Industry;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const industries: IndustryConfig[] = [
  { id: 'manufacturing', name: 'Manufacturing', icon: '🏭', color: 'text-blue-600', description: 'Automotive & Industrial Manufacturing' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: 'text-green-600', description: 'Hospital & Clinical Operations' },
  { id: 'construction', name: 'Construction', icon: '🏗️', color: 'text-orange-600', description: 'Infrastructure & Building Projects' },
  { id: 'financial', name: 'Financial Services', icon: '🏦', color: 'text-purple-600', description: 'Banking & Insurance' },
  { id: 'retail', name: 'Retail & E-Commerce', icon: '🛒', color: 'text-red-600', description: 'Omni-channel Retail Operations' },
];

interface IndustryContextType {
  currentIndustry: Industry;
  setCurrentIndustry: (industry: Industry) => void;
  industryConfig: IndustryConfig;
}

const IndustryContext = createContext<IndustryContextType | undefined>(undefined);

export const useIndustry = () => {
  const context = useContext(IndustryContext);
  if (!context) throw new Error('useIndustry must be used within IndustryProvider');
  return context;
};

export const IndustryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentIndustry, setCurrentIndustry] = useState<Industry>('manufacturing');

  const industryConfig = industries.find(i => i.id === currentIndustry) || industries[0];

  return (
    <IndustryContext.Provider value={{ currentIndustry, setCurrentIndustry, industryConfig }}>
      {children}
    </IndustryContext.Provider>
  );
};
