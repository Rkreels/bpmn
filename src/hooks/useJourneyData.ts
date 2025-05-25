
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useVoice } from '@/contexts/VoiceContext';

export interface JourneyStage {
  id: string;
  name: string;
  description: string;
  order: number;
  touchpoints: TouchPoint[];
  createdAt: string;
  updatedAt: string;
}

export interface TouchPoint {
  id: string;
  name: string;
  channel: string;
  type: "digital" | "physical" | "human";
  emotion: "very-negative" | "negative" | "neutral" | "positive" | "very-positive";
  duration: string;
  painPoints: string[];
  opportunities: string[];
  satisfaction: number;
  effort: number;
  interactions: number;
  conversionRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  department: string;
  age: number;
  location: string;
  goals: string[];
  painPoints: string[];
  motivations: string[];
  preferredChannels: string[];
  techSavviness: "low" | "medium" | "high";
  decisionInfluence: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

export interface Journey {
  id: string;
  name: string;
  description: string;
  personaId: string;
  stages: JourneyStage[];
  status: "draft" | "active" | "archived";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface JourneyTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  industry: string;
  author: string;
  createdDate: string;
  lastModified: string;
  version: string;
  rating: number;
  downloads: number;
  stages: number;
  touchpoints: number;
  personas: number;
  tags: string[];
  isPublic: boolean;
  isFavorite: boolean;
  templateData: Journey;
}

export const useJourneyData = () => {
  const { toast } = useToast();
  const { speakText } = useVoice();

  // Initial data
  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: "business-user",
      name: "Sarah Chen",
      role: "Business Analyst",
      department: "Operations",
      age: 32,
      location: "San Francisco, CA",
      goals: ["Improve process efficiency", "Reduce manual work", "Better reporting"],
      painPoints: ["Complex software", "Too many tools", "Lack of integration"],
      motivations: ["Career advancement", "Recognition", "Work-life balance"],
      preferredChannels: ["Email", "Slack", "Video calls"],
      techSavviness: "high",
      decisionInfluence: "medium",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-20T14:30:00Z"
    },
    {
      id: "technical-user",
      name: "Marcus Rodriguez",
      role: "IT Manager",
      department: "Information Technology",
      age: 38,
      location: "Austin, TX",
      goals: ["System reliability", "Security compliance", "Cost optimization"],
      painPoints: ["Legacy systems", "Security concerns", "Resource constraints"],
      motivations: ["Technical excellence", "Problem solving", "Innovation"],
      preferredChannels: ["Documentation", "Forums", "Direct contact"],
      techSavviness: "high",
      decisionInfluence: "high",
      createdAt: "2024-01-10T09:00:00Z",
      updatedAt: "2024-01-18T16:45:00Z"
    }
  ]);

  const [journeys, setJourneys] = useState<Journey[]>([
    {
      id: "main-journey",
      name: "B2B Customer Acquisition",
      description: "Complete customer journey from awareness to advocacy",
      personaId: "business-user",
      status: "active",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-25T14:30:00Z",
      createdBy: "Current User",
      stages: [
        {
          id: "awareness",
          name: "Awareness",
          description: "Customer becomes aware of the need",
          order: 1,
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-25T14:30:00Z",
          touchpoints: [
            {
              id: "search",
              name: "Online Search",
              channel: "Website",
              type: "digital",
              emotion: "neutral",
              duration: "5 min",
              painPoints: ["Too many options", "Unclear information"],
              opportunities: ["Better SEO", "Clear value proposition"],
              satisfaction: 3,
              effort: 2,
              interactions: 15420,
              conversionRate: 12.5,
              createdAt: "2024-01-15T10:00:00Z",
              updatedAt: "2024-01-25T14:30:00Z"
            }
          ]
        }
      ]
    }
  ]);

  const [templates, setTemplates] = useState<JourneyTemplate[]>([
    {
      id: "1",
      name: "B2B SaaS Customer Journey",
      description: "Complete customer journey for B2B SaaS companies from lead generation to advocacy",
      category: "Sales & Marketing",
      industry: "Technology",
      author: "Sarah Chen",
      createdDate: "2024-01-15",
      lastModified: "2024-01-20",
      version: "2.1",
      rating: 4.8,
      downloads: 342,
      stages: 6,
      touchpoints: 24,
      personas: 4,
      tags: ["B2B", "SaaS", "Technology", "Sales"],
      isPublic: true,
      isFavorite: false,
      templateData: {
        id: "template-1",
        name: "B2B SaaS Customer Journey",
        description: "Template for B2B SaaS customer journey",
        personaId: "business-user",
        status: "draft",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-20T14:30:00Z",
        createdBy: "Sarah Chen",
        stages: []
      }
    }
  ]);

  // CRUD Operations for Personas
  const createPersona = useCallback((personaData: Omit<Persona, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPersona: Persona = {
      ...personaData,
      id: `persona-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setPersonas(prev => [...prev, newPersona]);
    toast({
      title: "Persona Created",
      description: `${newPersona.name} has been created successfully.`
    });
    speakText(`New persona ${newPersona.name} has been created. This ${newPersona.role} persona will help you design more targeted customer journeys and understand specific user needs throughout their experience.`);
    
    return newPersona;
  }, [toast, speakText]);

  const updatePersona = useCallback((id: string, updates: Partial<Persona>) => {
    setPersonas(prev => prev.map(persona => 
      persona.id === id 
        ? { ...persona, ...updates, updatedAt: new Date().toISOString() }
        : persona
    ));
    
    const updatedPersona = personas.find(p => p.id === id);
    toast({
      title: "Persona Updated",
      description: `${updatedPersona?.name || 'Persona'} has been updated successfully.`
    });
    speakText(`Persona ${updatedPersona?.name} has been updated. Regular persona updates ensure your customer journeys remain accurate and reflect current user behaviors and needs.`);
  }, [personas, toast, speakText]);

  const deletePersona = useCallback((id: string) => {
    const persona = personas.find(p => p.id === id);
    setPersonas(prev => prev.filter(p => p.id !== id));
    
    toast({
      title: "Persona Deleted",
      description: `${persona?.name || 'Persona'} has been removed.`
    });
    speakText(`Persona ${persona?.name} has been deleted. Consider updating any journeys that were using this persona to maintain journey mapping accuracy.`);
  }, [personas, toast, speakText]);

  // CRUD Operations for Journeys
  const createJourney = useCallback((journeyData: Omit<Journey, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newJourney: Journey = {
      ...journeyData,
      id: `journey-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setJourneys(prev => [...prev, newJourney]);
    toast({
      title: "Journey Created",
      description: `${newJourney.name} has been created successfully.`
    });
    speakText(`New customer journey ${newJourney.name} has been created. You can now start mapping touchpoints and stages to visualize the complete customer experience.`);
    
    return newJourney;
  }, [toast, speakText]);

  const updateJourney = useCallback((id: string, updates: Partial<Journey>) => {
    setJourneys(prev => prev.map(journey => 
      journey.id === id 
        ? { ...journey, ...updates, updatedAt: new Date().toISOString() }
        : journey
    ));
    
    const updatedJourney = journeys.find(j => j.id === id);
    toast({
      title: "Journey Updated",
      description: `${updatedJourney?.name || 'Journey'} has been updated.`
    });
    speakText(`Journey ${updatedJourney?.name} has been updated. Journey updates help you iterate and improve the customer experience based on new insights and feedback.`);
  }, [journeys, toast, speakText]);

  const deleteJourney = useCallback((id: string) => {
    const journey = journeys.find(j => j.id === id);
    setJourneys(prev => prev.filter(j => j.id !== id));
    
    toast({
      title: "Journey Deleted",
      description: `${journey?.name || 'Journey'} has been removed.`
    });
    speakText(`Journey ${journey?.name} has been deleted from your journey library.`);
  }, [journeys, toast, speakText]);

  // Stage Operations
  const addStageToJourney = useCallback((journeyId: string, stageData: Omit<JourneyStage, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newStage: JourneyStage = {
      ...stageData,
      id: `stage-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setJourneys(prev => prev.map(journey => 
      journey.id === journeyId 
        ? { 
            ...journey, 
            stages: [...journey.stages, newStage].sort((a, b) => a.order - b.order),
            updatedAt: new Date().toISOString()
          }
        : journey
    ));

    toast({
      title: "Stage Added",
      description: `${newStage.name} stage has been added to the journey.`
    });
    speakText(`New stage ${newStage.name} has been added to your customer journey. This stage will help you map specific touchpoints and customer emotions at this phase of their experience.`);
    
    return newStage;
  }, [toast, speakText]);

  const updateStage = useCallback((journeyId: string, stageId: string, updates: Partial<JourneyStage>) => {
    setJourneys(prev => prev.map(journey => 
      journey.id === journeyId 
        ? {
            ...journey,
            stages: journey.stages.map(stage => 
              stage.id === stageId 
                ? { ...stage, ...updates, updatedAt: new Date().toISOString() }
                : stage
            ),
            updatedAt: new Date().toISOString()
          }
        : journey
    ));

    toast({
      title: "Stage Updated",
      description: "Journey stage has been updated successfully."
    });
    speakText("Journey stage has been updated. Stage modifications help refine the customer experience mapping and ensure accurate representation of customer interactions.");
  }, [toast, speakText]);

  const deleteStage = useCallback((journeyId: string, stageId: string) => {
    const journey = journeys.find(j => j.id === journeyId);
    const stage = journey?.stages.find(s => s.id === stageId);
    
    setJourneys(prev => prev.map(journey => 
      journey.id === journeyId 
        ? {
            ...journey,
            stages: journey.stages.filter(stage => stage.id !== stageId),
            updatedAt: new Date().toISOString()
          }
        : journey
    ));

    toast({
      title: "Stage Deleted",
      description: `${stage?.name || 'Stage'} has been removed from the journey.`
    });
    speakText(`Stage ${stage?.name} has been deleted from the journey. Consider redistributing any touchpoints to other stages to maintain journey completeness.`);
  }, [journeys, toast, speakText]);

  // Export Operations
  const exportJourneyData = useCallback((format: 'json' | 'csv' | 'pdf' = 'json') => {
    const exportData = {
      journeys,
      personas,
      templates,
      exportedAt: new Date().toISOString(),
      version: "1.0"
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `journey-data-${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Journey data has been exported as ${format.toUpperCase()}.`
    });
    speakText(`Journey data has been successfully exported in ${format} format. This includes all your journeys, personas, and templates for backup or sharing with stakeholders.`);
  }, [journeys, personas, templates, toast, speakText]);

  const shareJourney = useCallback((journeyId: string, method: 'link' | 'email' | 'download' = 'link') => {
    const journey = journeys.find(j => j.id === journeyId);
    
    if (!journey) {
      toast({
        title: "Journey Not Found",
        description: "Unable to share the selected journey.",
        variant: "destructive"
      });
      return;
    }

    // Simulate sharing functionality
    const shareData = {
      journey,
      persona: personas.find(p => p.id === journey.personaId),
      sharedAt: new Date().toISOString(),
      shareMethod: method
    };

    toast({
      title: "Journey Shared",
      description: `${journey.name} has been shared via ${method}.`
    });
    speakText(`Journey ${journey.name} has been shared successfully. Stakeholders can now view the customer journey map, including all touchpoints, pain points, and optimization opportunities.`);

    return shareData;
  }, [journeys, personas, toast, speakText]);

  return {
    // Data
    personas,
    journeys,
    templates,
    
    // Persona CRUD
    createPersona,
    updatePersona,
    deletePersona,
    
    // Journey CRUD
    createJourney,
    updateJourney,
    deleteJourney,
    
    // Stage Operations
    addStageToJourney,
    updateStage,
    deleteStage,
    
    // Utility Operations
    exportJourneyData,
    shareJourney
  };
};
