
import { useState, useCallback } from "react";

export interface Journey {
  id: string;
  name: string;
  description: string;
  status: "active" | "draft" | "archived";
  personaId: string;
  stages: JourneyStage[];
  createdAt: string;
  updatedAt: string;
}

export interface JourneyStage {
  id: string;
  name: string;
  description: string;
  touchpoints: Touchpoint[];
  order: number;
}

export interface Touchpoint {
  id: string;
  name: string;
  type: "digital" | "physical" | "human";
  channel: string;
  description: string;
  satisfaction: number;
  emotion: "very-negative" | "negative" | "neutral" | "positive" | "very-positive";
  duration: string;
  painPoints: string[];
  opportunities: string[];
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  demographics: string;
  goals: string[];
  painPoints: string[];
  role: string;
  department: string;
  techSavviness: "low" | "medium" | "high";
  decisionInfluence: "low" | "medium" | "high";
}

export const useJourneyData = () => {
  const [journeys, setJourneys] = useState<Journey[]>([
    {
      id: "1",
      name: "Customer Onboarding Journey",
      description: "End-to-end customer onboarding experience",
      status: "active",
      personaId: "1",
      stages: [
        {
          id: "stage1",
          name: "Awareness",
          description: "Customer becomes aware of our product",
          order: 1,
          touchpoints: [
            {
              id: "tp1",
              name: "Website Visit",
              type: "digital",
              channel: "Website",
              description: "Initial website exploration",
              satisfaction: 4.2,
              emotion: "positive",
              duration: "5 minutes",
              painPoints: ["Complex navigation", "Too much information"],
              opportunities: ["Simplify landing page", "Add guided tour"]
            }
          ]
        }
      ],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20"
    }
  ]);

  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: "1",
      name: "Tech-Savvy Professional",
      description: "Early adopter with high technical knowledge",
      demographics: "25-40 years, Urban, High income",
      goals: ["Efficiency", "Innovation", "Growth"],
      painPoints: ["Complex processes", "Time constraints", "Poor user experience"],
      role: "Senior Manager",
      department: "IT",
      techSavviness: "high",
      decisionInfluence: "high"
    }
  ]);

  const createJourney = useCallback((journeyData: Omit<Journey, "id" | "createdAt" | "updatedAt">) => {
    const newJourney: Journey = {
      ...journeyData,
      id: `journey_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setJourneys(prev => [...prev, newJourney]);
    return newJourney.id;
  }, []);

  const updateJourney = useCallback((id: string, updates: Partial<Journey>) => {
    setJourneys(prev => 
      prev.map(journey => 
        journey.id === id 
          ? { ...journey, ...updates, updatedAt: new Date().toISOString() }
          : journey
      )
    );
  }, []);

  const deleteJourney = useCallback((id: string) => {
    setJourneys(prev => prev.filter(journey => journey.id !== id));
  }, []);

  const addStageToJourney = useCallback((journeyId: string, stageData: Omit<JourneyStage, "id">) => {
    const newStage: JourneyStage = {
      ...stageData,
      id: `stage_${Date.now()}`
    };
    setJourneys(prev => 
      prev.map(journey => 
        journey.id === journeyId 
          ? { ...journey, stages: [...journey.stages, newStage], updatedAt: new Date().toISOString() }
          : journey
      )
    );
    return newStage.id;
  }, []);

  const deleteStage = useCallback((journeyId: string, stageId: string) => {
    setJourneys(prev => 
      prev.map(journey => 
        journey.id === journeyId 
          ? { 
              ...journey, 
              stages: journey.stages.filter(stage => stage.id !== stageId),
              updatedAt: new Date().toISOString()
            }
          : journey
      )
    );
  }, []);

  const exportJourneyData = useCallback((format: "json" | "csv" | "pdf") => {
    console.log(`Exporting journey data in ${format} format`);
    // Implementation for export functionality
  }, []);

  const shareJourney = useCallback((journeyId: string, method: "link" | "email") => {
    console.log(`Sharing journey ${journeyId} via ${method}`);
    // Implementation for sharing functionality
  }, []);

  return {
    journeys,
    personas,
    createJourney,
    updateJourney,
    deleteJourney,
    addStageToJourney,
    deleteStage,
    exportJourneyData,
    shareJourney
  };
};
