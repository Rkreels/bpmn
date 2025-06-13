
import { useState } from "react";

export interface CustomerJourney {
  id: string;
  name: string;
  description: string;
  status: "draft" | "active" | "completed";
  createdAt: string;
  updatedAt: string;
  stages: JourneyStage[];
  persona: string;
}

export interface JourneyStage {
  id: string;
  name: string;
  description: string;
  order: number;
  touchpoints: Touchpoint[];
  emotions: string[];
  painPoints: string[];
  opportunities: string[];
}

export interface Touchpoint {
  id: string;
  name: string;
  channel: string;
  type: "digital" | "physical" | "human";
  satisfaction: number;
  effort: number;
  frequency: number;
}

export interface Persona {
  id: string;
  name: string;
  age: number;
  role: string;
  goals: string[];
  painPoints: string[];
  behaviors: string[];
  channels: string[];
}

export const useJourneyData = () => {
  const [journeys, setJourneys] = useState<CustomerJourney[]>([
    {
      id: "1",
      name: "Digital Onboarding Journey",
      description: "Complete customer onboarding experience from signup to first transaction",
      status: "active",
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-15T14:30:00Z",
      persona: "Tech-Savvy Professional",
      stages: [
        {
          id: "s1",
          name: "Awareness",
          description: "Customer discovers our service",
          order: 1,
          touchpoints: [
            {
              id: "t1",
              name: "Website Visit",
              channel: "Web",
              type: "digital",
              satisfaction: 8,
              effort: 3,
              frequency: 85
            }
          ],
          emotions: ["curious", "hopeful"],
          painPoints: ["information overload"],
          opportunities: ["simplify messaging"]
        },
        {
          id: "s2", 
          name: "Consideration",
          description: "Customer evaluates our offering",
          order: 2,
          touchpoints: [
            {
              id: "t2",
              name: "Product Demo",
              channel: "Video Call",
              type: "human",
              satisfaction: 9,
              effort: 4,
              frequency: 65
            }
          ],
          emotions: ["interested", "cautious"],
          painPoints: ["complex pricing"],
          opportunities: ["clearer pricing"]
        }
      ]
    }
  ]);

  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: "1",
      name: "Tech-Savvy Professional",
      age: 32,
      role: "Software Engineer",
      goals: ["Efficiency", "Innovation", "Growth"],
      painPoints: ["Complex interfaces", "Slow processes"],
      behaviors: ["Mobile-first", "Self-service preference"],
      channels: ["Mobile App", "Web", "Email"]
    },
    {
      id: "2", 
      name: "Business Executive",
      age: 45,
      role: "VP of Operations",
      goals: ["ROI", "Scalability", "Compliance"],
      painPoints: ["Lack of visibility", "Manual processes"],
      behaviors: ["Delegator", "Data-driven decisions"],
      channels: ["Dashboard", "Reports", "Phone"]
    }
  ]);

  const createJourney = (journeyData: Partial<CustomerJourney>) => {
    const newJourney: CustomerJourney = {
      id: Date.now().toString(),
      name: journeyData.name || "New Journey",
      description: journeyData.description || "",
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stages: [],
      persona: journeyData.persona || "",
      ...journeyData
    };

    setJourneys(prev => [newJourney, ...prev]);
    return newJourney.id;
  };

  const updateJourney = (id: string, updates: Partial<CustomerJourney>) => {
    setJourneys(prev => prev.map(journey =>
      journey.id === id
        ? { ...journey, ...updates, updatedAt: new Date().toISOString() }
        : journey
    ));
  };

  const deleteJourney = (id: string) => {
    setJourneys(prev => prev.filter(journey => journey.id !== id));
  };

  const addStage = (journeyId: string, stage: Omit<JourneyStage, "id">) => {
    const newStage: JourneyStage = {
      ...stage,
      id: Date.now().toString()
    };

    setJourneys(prev => prev.map(journey =>
      journey.id === journeyId
        ? {
            ...journey,
            stages: [...journey.stages, newStage],
            updatedAt: new Date().toISOString()
          }
        : journey
    ));
  };

  const exportJourneyData = (format: string) => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `journey-maps-${timestamp}.${format}`;
    
    const data = {
      journeys,
      personas,
      exportedAt: new Date().toISOString()
    };

    console.log(`Exporting journey data as ${filename}:`, data);
    return filename;
  };

  const shareJourney = (journeyId: string, shareType: "link" | "email") => {
    const journey = journeys.find(j => j.id === journeyId);
    if (journey) {
      const shareUrl = `${window.location.origin}/journey/${journeyId}`;
      
      if (shareType === "link") {
        navigator.clipboard.writeText(shareUrl);
      }
      
      console.log(`Sharing journey "${journey.name}" via ${shareType}:`, shareUrl);
      return shareUrl;
    }
  };

  return {
    journeys,
    personas,
    createJourney,
    updateJourney,
    deleteJourney,
    addStage,
    exportJourneyData,
    shareJourney
  };
};
